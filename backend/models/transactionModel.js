const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const {
  getImmutableFields,
  preUpdateImmutableFieldsMiddleware,
} = require("../utils/schemaUtils");
const AppError = require("../utils/appError");

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
    immutable: true,
  },
  type: {
    type: String,
    enum: ["income", "expense", "investment", "roundup"],
    default: "expense",
    required: [true, "Type is required"],
    immutable: true,
  },
  amount: { type: Number, immutable: true },
  category: {
    type: String,
    enum: [
      "food",
      "utilities",
      "transportation",
      "entertainment",
      "health",
      "education",
      "others",
    ],
    required: [
      function () {
        return this.type === "expense";
      },
      "Expense category must be added",
    ],
  },
  description: String,
  createdAt: { type: Date, immutable: true },
});

transactionSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = Date.now() - 1000;
  }

  next();
});

//Check if the payload has immutable fields
preUpdateImmutableFieldsMiddleware(transactionSchema, getImmutableFields);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
