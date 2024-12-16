const express = require("express");
const router = express.Router({ mergeParams: true });
const investmentController = require("../controllers/investmentController");
const authController = require("../controllers/authController");

const {
  getAllInvestments,
  getInvestment,
  createInvestment,
  deleteInvestment,
  updateInvestment,
  getInvestmentStats,
} = investmentController;

const { protectEndpoints } = authController;

//Protect the endpoints to users with jwt token
router.use(protectEndpoints);

router.route("/").get(getAllInvestments).post(createInvestment);

//Investment stats route
router.route("/stats").get(getInvestmentStats);

router
  .route("/:id")
  .get(getInvestment)
  .patch(updateInvestment)
  .delete(deleteInvestment);

module.exports = router;
