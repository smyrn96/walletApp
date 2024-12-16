const mongoose = require("mongoose");

exports.catchAsync = (fn, useTransaction = false) => {
  return async (req, res, next) => {
    let session;

    try {
      if (useTransaction) {
        session = await mongoose.startSession();
        session.startTransaction();
        req.session = session; // Attach the session to the request object
      }
      // Execute the async function
      const result = await fn(req, res, next);

      // Commit the transaction if everything goes well
      if (useTransaction && session) {
        await session.commitTransaction();
      }

      return result;
    } catch (err) {
      // Abort the transaction in case of an error
      if (useTransaction && session) {
        await session.abortTransaction();
      }

      return next(err);
    } finally {
      // End the session
      if (session) {
        session.endSession();
      }
    }
  };
};
