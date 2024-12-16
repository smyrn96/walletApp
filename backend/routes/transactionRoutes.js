const express = require("express");
const router = express.Router({ mergeParams: true });
const transactionController = require("../controllers/transactionController");
const authController = require("../controllers/authController");

const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
} = transactionController;

const { protectEndpoints } = authController;

//Protect the endpoints to users with jwt token
router.use(protectEndpoints);

router.route("/").get(getAllTransactions).post(createTransaction);
router.route("/stats").get(getTransactionStats);
router
  .route("/:id")
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
