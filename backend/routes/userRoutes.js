const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController.js");
const { isLoggedIn } = require("../middleware/authMiddleware.js");
const { authorize } = require("../middleware/roleMiddleware.js");
const { asyncHandler } = require("../util/asyncHandler.js");

// Profile routes (any logged-in user)
router.get("/profile", isLoggedIn, asyncHandler(getMyProfile));
router.put("/profile", isLoggedIn, asyncHandler(updateMyProfile));

// Admin + Manager
router.get(
  "/",
  isLoggedIn,
  authorize("admin", "manager"),
  asyncHandler(getUsers),
);
router.get(
  "/:id",
  isLoggedIn,
  authorize("admin", "manager"),
  asyncHandler(getUserById),
);

// Admin only
router.post("/", isLoggedIn, authorize("admin"), asyncHandler(createUser));

router.put(
  "/:id",
  isLoggedIn,
  authorize("admin", "manager"),
  asyncHandler(updateUser),
);
router.delete("/:id", isLoggedIn, authorize("admin"), asyncHandler(deleteUser));

module.exports = router;
