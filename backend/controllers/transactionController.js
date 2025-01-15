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
  const aggregationPipeline = [
    // Step 1: Group by 'type' for the stats
    {
      $group: {
        _id: "$type", // Group by transaction type (income, expense, etc.)
        total: { $sum: "$amount" }, // Sum amounts for each type
      },
    },
    {
      $project: {
        title: "$_id", // Rename _id to 'title'
        total: 1, // Include the total
        _id: 0, // Exclude the original _id field
      },
    },
  ];

  // Execute the aggregation to get transaction stats (total for each type)
  const stats = await Transaction.aggregate(aggregationPipeline);
  const statsTotal = stats.reduce((sum, stat) => sum + stat.total, 0);

  // Step 2: Get category breakdown only for 'expense' transactions
  const categoryPipeline = [
    {
      $match: { type: "expense" }, // Only consider 'expense' type transactions
    },
    {
      $group: {
        _id: "$category", // Group by category for 'expense' type
        total: { $sum: "$amount" }, // Sum the amounts for each category
      },
    },
    {
      $project: {
        title: "$_id", // Rename _id to 'title'
        total: 1, // Include the total
        _id: 0, // Exclude the original _id field
      },
    },
  ];

  // Execute the aggregation to get category totals
  const expenses = await Transaction.aggregate(categoryPipeline);
  const expensesTotal = expenses.reduce(
    (sum, transaction) => sum + transaction.total,
    0
  );

  // Format and return the response
  res.status(200).json({
    status: "success",
    data: {
      stats: stats.map((item, index) => ({
        id: index,
        title: item.title,
        total: item.total,
      })),
      statsTotal: statsTotal, // Add total for stats aggregation
      expenses: expenses.map((item, index) => ({
        id: index,
        title: item.title,
        total: item.total,
      })),
      expensesTotal: expensesTotal, // Add total for transactions aggregation
    },
  });
});
