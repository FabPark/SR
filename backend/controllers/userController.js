const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // This gets the username and role
    const { username, role } = user;

    // Create a token with user ID and role
    const token = createToken(user._id, role);

    res.status(200).json({ email, username, role, token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(401).json({ error: "Invalid credentials" });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    // Create a token with user ID and role
    const token = createToken(user._id, user.role);

    res.status(200).json({ email, username, role: user.role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get prof pic
const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get user details using token
const getUserDetails = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUserById, getUserDetails };
