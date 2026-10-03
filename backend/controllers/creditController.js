/**
 * creditController.js
 *
 *   GET /api/credits/my-credits  → getMyCredits
 *
 * Rules:
 * - Faculty can only view their own credit history.
 * - Response includes a running total for the dashboard.
 * - Credits are awarded automatically by creditCalculator.js on course completion.
 *   Faculty cannot manually create credits via API.
 */

const Credit = require('../models/Credit');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get credit history + total for the authenticated faculty
// @route   GET /api/credits/my-credits
// @access  Protected (faculty)
// ─────────────────────────────────────────────────────────────────────────────
const getMyCredits = async (req, res, next) => {
  try {
    const credits = await Credit.find({ faculty: req.user._id })
      .populate('course', 'title category thumbnail')
      .sort({ awardedAt: -1 });

    // Calculate running total
    const totalCredits = credits.reduce((sum, c) => sum + c.creditsEarned, 0);

    return res.status(200).json({
      success: true,
      totalCredits,
      count: credits.length,
      credits,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyCredits };
