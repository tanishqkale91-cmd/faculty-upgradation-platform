/**
 * achievementRoutes.js
 *
 *   GET /api/achievements/my-achievements  → getMyAchievements (protect)
 *
 * No write routes — achievements are awarded server-side only.
 */

const express = require('express');
const { getMyAchievements } = require('../controllers/achievementController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/my-achievements', protect, getMyAchievements);

module.exports = router;
