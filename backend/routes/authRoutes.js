const express = require("express");
const router = express.Router();
const { login, getMe, register, logout } = require("../controllers/authController.js");
const { isLoggedIn } = require("../middleware/authMiddleware");
const { asyncHandler } = require("../util/asyncHandler");

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

router.get("/me", isLoggedIn, asyncHandler(getMe));

module.exports = router;
