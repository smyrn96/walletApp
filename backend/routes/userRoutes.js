const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

const { signup } = authController;

//Visible routes to all
router.route("/signup").post(signup);

//Get all users, Create user
router.route("/").get(getAllUsers).post(createUser);
//Get, update ,delete specific user
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
