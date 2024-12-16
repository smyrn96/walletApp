const express = require("express");
const router = express.Router();
const transactionRouter = require("./transactionRoutes");
const investmentRouter = require("./investmentRoutes");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

const { signup, login, protectEndpoints, restrictTo } = authController;

//Get transactions and investments linked to a user
router.use("/:userId/transactions", transactionRouter);
router.use("/:userId/investments", investmentRouter);

//Visible routes to all
router.route("/signup").post(signup);
router.route("/login").post(login);

//Restrict endpoints after this middleware to users with jwt token
router.use(protectEndpoints);

//Restrict endpoints to admin users
router.use(restrictTo("admin"));

//Get all users, Create user
router.route("/").get(getAllUsers).post(createUser);
//Get, update ,delete specific user
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
