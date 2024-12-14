const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  type: {
    type: String,
    enum: ["income", "expense", "investment"],
    default: "expense",
    required: [true, "Type is required"],
  },
  amount: Number,
  category: {
    type: String,
    enum: [
      "Food",
      "Utilities",
      "Transportation",
      "Entertainment",
      "Health",
      "Education",
      "Others",
    ],
    required: [true, "Category is required"],
  },
  description: String,
  createdAt: Date,
});

transactionSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = Date.now() - 1000;
  }

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
