const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxLength: [40, "The name length has to be less than 40 characters long"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please type a valid email address"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: [8, "The password must have at least 8 characters"],
    maxLength: [
      100,
      "The password length has to be less than 100 characters long",
    ],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: [8, "The password must have at least 8 characters"],
    maxLength: [
      100,
      "The password length has to be less than 100 characters long",
    ],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and password confirmation must be the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
