/**
 * authController.js
 *
 * Handles all authentication-related request logic:
 *
 *   POST /api/auth/register  → registerUser
 *   POST /api/auth/login     → loginUser
 *   GET  /api/auth/me        → getMe
 *
 * Design decisions:
 * - Passwords are hashed with bcryptjs (salt rounds = 12) before storage.
 * - The `password` field is NEVER returned in any response.
 * - JWTs are signed using the `generateToken` utility.
 * - Duplicate email → 409 Conflict (not 500).
 * - All errors either use explicit status codes or are forwarded via next(err).
 */

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build the safe user object sent in responses (no password field)
// ─────────────────────────────────────────────────────────────────────────────
const buildUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department || null,
  designation: user.designation || null,
  profilePicture: user.profilePicture || '',
  isActive: user.isActive,
  createdAt: user.createdAt,
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Register a new faculty user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ── 1. Basic input validation ──────────────────────────────────────────
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // ── 2. Check for duplicate email ───────────────────────────────────────
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // ── 3. Hash the password ───────────────────────────────────────────────
    // Salt rounds = 12 is a good balance between security and performance
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ── 4. Create user (role defaults to 'faculty' per model schema) ───────
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      // role is intentionally NOT taken from req.body here.
      // Admin accounts should be created via a separate seeded process.
    });

    // ── 5. Generate JWT and respond ────────────────────────────────────────
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Authenticate user and return JWT
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ── 1. Basic input validation ──────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // ── 2. Find user (explicitly select password which is normally excluded) ─
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    // Deliberately vague message — don't reveal whether email exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // ── 3. Check account status ────────────────────────────────────────────
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact the administrator.',
      });
    }

    // ── 4. Compare password ────────────────────────────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // ── 5. Generate JWT and respond ────────────────────────────────────────
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Return the currently authenticated user
// @route   GET /api/auth/me
// @access  Protected (requires valid JWT via authMiddleware)
// ─────────────────────────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    // req.user is attached by authMiddleware — password field is already excluded
    return res.status(200).json({
      success: true,
      user: buildUserResponse(req.user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
