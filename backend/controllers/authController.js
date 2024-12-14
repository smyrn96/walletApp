const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

//Signing the token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Generic function every time we need to send the token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    role,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email or password is required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("There is no user with that credentials", 401));
  }

  createSendToken(user, 200, res);
});

//Restrict endpoints to given roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You do not have a permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.protectEndpoints = catchAsync(async (req, res, next) => {
  const headers = req.headers;
  let token;

  if (headers.authorization || headers.authorization.startsWith("Bearer")) {
    token = headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Unauthorized. Please login to access."));
  }

  const tokenValidation = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentUser = await User.findById(tokenValidation.id);
  if (!currentUser) {
    return next(new AppError("The user does no longer exists.", 401));
  }

  if (currentUser.comparePasswordChangedDates(tokenValidation.iat)) {
    return next(
      new AppError("The password was recently changed. Login again.")
    );
  }

  req.user = currentUser;
  next();
});
