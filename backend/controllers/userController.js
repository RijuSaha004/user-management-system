const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createUserSchema } = require('../validationSchema');
const { appError } = require('../util/errorHandler');

// @GET /api/users — Admin/Manager // -------------
const getUsers = async (req, res) => {
    const { role, status, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Managers cannot see admins
    if (req.user.role === 'manager') {
      query.role = { $ne: 'admin' };
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
};

// @GET /api/users/:id — Admin/Manager
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Manager cannot view admin
    if (req.user.role === 'manager' && user.role === 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(user);
};

// @POST /api/users — Admin only
const createUser = async (req, res) => {
  const validationResult = createUserSchema.safeParse(req.body);
  
    if (!validationResult.success) {
      throw new appError("Invalid Credentials", 400);
    }

  const { name, email, password, role, status } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      status: status || 'active',
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
};

// @PUT /api/users/:id — Admin (all), Manager (non-admin only)
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Manager cannot update admin
    if (req.user.role === 'manager' && user.role === 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, email, role, status, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (status) user.status = status;

    // Only admin can change roles
    if (role && req.user.role === 'admin') user.role = role;

    if (password) {
      user.password = password;
    }

    user.updatedBy = req.user._id;
    await user.save();

    res.json({ message: 'User updated successfully' });
};

// @DELETE /api/users/:id — Admin only (soft delete) // ---------
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new appError("User not found", 404);

    if (user._id.toString() === req.user._id.toString()) {
      throw new appError("Cannot delete yourself", 400)
    }

    user.status = 'inactive';
    user.updatedBy = req.user._id;
    await user.save();

    res.json({ message: 'User deactivated successfully' });
};

// @GET /api/users/profile — Logged-in user // --------
const getMyProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    res.json(user);

};

// @PUT /api/users/profile — Logged-in user // --------
const updateMyProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    const { name, password } = req.body;
    
    if (name) user.name = name;
    if (password) {
      user.password = password;
    }

    user.updatedBy = req.user._id;
    await user.save();

    res.json({ message: 'Profile updated successfully' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};