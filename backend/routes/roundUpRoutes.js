const express = require("express");
const router = express.Router({ mergeParams: true });
const roundUpController = require("../controllers/roundUpController");
const authController = require("../controllers/authController");

const {
  getAllRoundUps,
  getRoundUp,
  createRoundUp,
  updateRoundUp,
  deleteRoundUp,
} = roundUpController;

const { protectEndpoints } = authController;

//Protect the endpoints to users with jwt token
router.use(protectEndpoints);

router.route("/").get(getAllRoundUps).post(createRoundUp);
router.route("/:id").get(getRoundUp).patch(updateRoundUp).delete(deleteRoundUp);

module.exports = router;
