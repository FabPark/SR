const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id, role } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Set the user object in the request
    req.user = user;

    //might use this later
    if (role === "admin") {
      // If the user is an admin, set an isAdmin flag in the request
      req.isAdmin = true;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

//check admin but might use this later
const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res
      .status(403)
      .json({ error: "Forbidden - Admin Permissions Required" });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };
