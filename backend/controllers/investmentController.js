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

exports.getInvestmentStats = catchAsync(async (req, res, next) => {
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

  // const stats = await Investment.aggregate([
  //   { $match: matchStage }, // Filter by user and date range
  //   {
  //     $group: {
  //       _id: "$type",
  //       totalAmount: { $sum: "$amount" },
  //       minAmount: { $min: "$amount" },
  //       maxAmount: { $max: "$amount" },
  //       avgAmount: { $avg: "$amount" },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $project: {
  //       type: "$_id",
  //       _id: 0,
  //       totalAmount: 1,
  //       minAmount: 1,
  //       maxAmount: 1,
  //       avgAmount: 1,
  //       count: 1,
  //       categories: 1,
  //     },
  //   },
  // ]);

  // Step 2: Get category breakdown only for 'expense' transactions
  const categoryPipeline = [
    { $match: matchStage }, // Filter by user and date range
    {
      $group: {
        _id: "$type", // Group by category for 'expense' type
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
    {
      $sort: { total: -1 }, // Sort by 'total' in descending order
    },
  ];

  // Execute the aggregation to get category totals
  const investments = await Investment.aggregate(categoryPipeline);
  const investmentsTotal = investments.reduce(
    (sum, investment) => sum + investment.total,
    0
  );

  res.status(200).json({
    status: "success",
    data: {
      investments: investments.map((item, index) => ({
        id: index,
        title: item.title,
        total: item.total,
      })),
      investmentsTotal: investmentsTotal, // Add total for transactions aggregation
    },
  });
});
