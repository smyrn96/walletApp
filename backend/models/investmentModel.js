const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const transactionController = require("../controllers/transactionController");
const AppError = require("../utils/appError");
const {
  getImmutableFields,
  preUpdateImmutableFieldsMiddleware,
} = require("../utils/schemaUtils");

const investmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
    immutable: true,
  },
  transactionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Transaction",
    required: [true, "Transaction is required"],
    immutable: true,
  },
  type: {
    type: String,
    enum: ["stock", "bond", "crypto", "etf"],
    required: [true, "Type is required"],
    immutable: true,
  },
  amount: { type: Number, immutable: true },
  description: String,
  createdAt: { type: Date, immutable: true },
});

investmentSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = Date.now() - 1000;
  }

  next();
});

//Check if the payload has immutable fields
preUpdateImmutableFieldsMiddleware(investmentSchema, getImmutableFields);

const Investment = mongoose.model("Investment", investmentSchema);
module.exports = Investment;
