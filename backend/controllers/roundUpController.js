const Transaction = require("../models/transactionModel");
const RoundUp = require("../models/roundUpModel");
const { catchAsync } = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllRoundUps = factory.getAll(RoundUp);
exports.getRoundUp = factory.getOne(RoundUp);
exports.createRoundUp = catchAsync(async (req, res, next) => {
  //setting the user id to the current user
  req.body.userId = req.user.id;
  const { userId, roundUpAmount, description, type } = req.body;

  //creating a session to link a transaction with an roundUp
  const transaction = await Transaction.create(
    [
      {
        userId,
        type: "roundup",
        amount: roundUpAmount,
        category: "others",
        description,
      },
    ],
    { session: req.session }
  );

  const doc = await RoundUp.create(
    [
      {
        userId,
        transactionId: transaction[0]._id,
        roundUpAmount,
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

exports.updateRoundUp = factory.updateOne(RoundUp);
exports.deleteRoundUp = factory.deleteOne(RoundUp);
