/**
 * authMiddleware.js
 *
 * Verifies the incoming JWT and attaches the decoded user payload
 * to req.user so downstream controllers and middlewares can use it.
 *
 * Expected header format:
 *   Authorization: Bearer <token>
 *
 * On success  → calls next()
 * On failure  → returns 401 JSON error
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Extract token from the Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised — no token provided',
    });
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch the user from DB (omit password field)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — user no longer exists',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — account has been deactivated',
      });
    }

    // 4. Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handles jwt.verify errors: TokenExpiredError, JsonWebTokenError, etc.
    return res.status(401).json({
      success: false,
      message: 'Not authorised — invalid or expired token',
    });
  }
};

module.exports = { protect };
