const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

//Get all users, Create user
router.route("/").get(getAllUsers).post(createUser);
//Get, update ,delete specific user
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
