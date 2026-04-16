const { asyncHandler } = require("../util/asyncHandler.js")
const { appError } = require("../util/errorHandler.js")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken");


module.exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new appError("Authentication required", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new appError("Invalid or expired token", 401);
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new appError("User no longer exists", 401);
  }

  req.user = user;
  next();
});