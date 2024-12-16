const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const transactionController = require("../controllers/transactionController");
const AppError = require("../utils/appError");
const {
  getImmutableFields,
  preUpdateImmutableFieldsMiddleware,
} = require("../utils/schemaUtils");

const roundUpSchema = mongoose.Schema({
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
  roundUpAmount: { type: Number, immutable: true },
  createdAt: { type: Date, immutable: true },
});

roundUpSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = Date.now() - 1000;
  }

  next();
});

//Check if the payload has immutable fields
preUpdateImmutableFieldsMiddleware(roundUpSchema, getImmutableFields);

const RoundUp = mongoose.model("RoundUp", roundUpSchema);
module.exports = RoundUp;
