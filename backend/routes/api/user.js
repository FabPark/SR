const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getUserById,
  getUserDetails,
} = require("../../controllers/userController");

const router = express.Router();

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

//get data
router.get("/:userId", getUserById);

// get user details
router.get("/users", getUserDetails);

module.exports = router;
