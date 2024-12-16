const Investment = require("../models/investmentModel");
const Transaction = require("../models/transactionModel");
const { catchAsync } = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllInvestments = factory.getAll(Investment);
exports.getInvestment = factory.getOne(Investment);
exports.createInvestment = catchAsync(async (req, res, next) => {
  //setting the user id to the current user
  req.body.userId = req.user.id;
  const { userId, amount, description, type } = req.body;

  //creating a session to link a transaction with an investment
  const transaction = await Transaction.create(
    [
      {
        userId,
        type: "investment",
        amount,
        category: "others",
        description,
      },
    ],
    { session: req.session }
  );

  const doc = await Investment.create(
    [
      {
        userId,
        transactionId: transaction[0]._id,
        type,
        amount,
        description,
      },
    ],
    { session: req.session }
  );

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
}, true);

exports.updateInvestment = factory.updateOne(Investment);
exports.deleteInvestment = factory.deleteOne(Investment);
