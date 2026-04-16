const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validationSchema");
const { appError } = require("../util/errorHandler");
const { generateToken } = require("../util/generateJWTToken");

// @POST /api/auth/register
const register = async (req, res) => {
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw new appError("Invalid Credentials", 400);
  }

  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new appError("Email already registered", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
    status: "active",
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true, // ALWAYS true
    secure: process.env.NODE_ENV === "development" ? false : true, // false in dev (no HTTPS)
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};

// @POST /api/auth/login
const login = async (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw new appError("Invalid Credentials", 400);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new appError("Invalid email or password", 401);
  }

  if (user.status === "inactive") {
    return res
      .status(403)
      .json({ message: "Account is inactive. Contact admin." });
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true, // ALWAYS true
    secure: process.env.NODE_ENV === "development" ? false : true, // false in dev (no HTTPS)
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true, // false in dev (no HTTPS)
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// @GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { login, register, logout, getMe };
