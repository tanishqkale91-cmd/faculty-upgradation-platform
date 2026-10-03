/**
 * facultyRoutes.js
 *
 *   GET /api/faculty/profile  → getProfile   (protect)
 *   PUT /api/faculty/profile  → updateProfile (protect)
 */

const express = require('express');
const { getProfile, updateProfile } = require('../controllers/facultyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
