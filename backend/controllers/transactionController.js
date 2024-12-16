const Transaction = require("../models/transactionModel");
const { catchAsync } = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);
exports.createTransaction = factory.createOne(Transaction);
exports.updateTransaction = factory.updateOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);

exports.getTransactionStats = catchAsync(async (req, res, next) => {
  const { start_date, end_date } = req.query;

  // Default time range: last 30 days
  const matchStage = {
    userId: req.user._id, // Filter transactions by the logged-in user
  };

  // If a date range is provided, add it to the filter
  if (start_date || end_date) {
    matchStage.createdAt = {};
    if (start_date) matchStage.createdAt.$gte = new Date(start_date);
    if (end_date) matchStage.createdAt.$lte = new Date(end_date);
  }

  const stats = await Transaction.aggregate([
    { $match: matchStage }, // Filter by user and date range
    {
      $group: {
        _id: { type: "$type", category: "$category" }, // Group by type and category
        totalAmount: { $sum: "$amount" }, // Sum the amounts per category and type
      },
    },
    {
      $group: {
        _id: "$_id.type", // Group by type (income, expense, roundup)
        totalAmount: { $sum: "$totalAmount" }, // Total amount for each type
        categories: {
          $push: {
            $cond: {
              if: { $eq: ["$_id.type", "expense"] }, // Only push categories if the type is "expense"
              then: {
                category: "$_id.category", // Collect category under "expense"
                total: "$totalAmount", // Total amount for each category
              },
              else: "$$REMOVE", // If not "expense", remove this field
            },
          },
        },
      },
    },
    {
      $project: {
        type: "$_id", // Convert _id to type
        _id: 0,
        totalAmount: 1,
        categories: 1, // Keep categories for expense type only
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: stats,
  });
});
