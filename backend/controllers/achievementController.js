/**
 * achievementController.js
 *
 *   GET /api/achievements/my-achievements  → getMyAchievements
 *
 * Rules:
 * - Faculty can only READ their own achievements.
 * - Achievements are ONLY awarded server-side (via creditCalculator.js).
 * - There is no POST/PUT/DELETE endpoint — faculty cannot grant achievements.
 */

const Achievement = require('../models/Achievement');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all achievements for the authenticated faculty
// @route   GET /api/achievements/my-achievements
// @access  Protected (faculty)
// ─────────────────────────────────────────────────────────────────────────────
const getMyAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ faculty: req.user._id })
      .sort({ awardedAt: -1 });

    return res.status(200).json({
      success: true,
      count: achievements.length,
      achievements,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyAchievements };
