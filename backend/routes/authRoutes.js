/**
 * authRoutes.js
 *
 * Mounts authentication endpoints under /api/auth (registered in server.js).
 *
 *   POST /api/auth/register  → public
 *   POST /api/auth/login     → public
 *   GET  /api/auth/me        → protected (valid JWT required)
 */

const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route — JWT must be present and valid
router.get('/me', protect, getMe);

module.exports = router;
