/**
 * creditRoutes.js
 *
 *   GET /api/credits/my-credits  → getMyCredits (protect)
 */

const express = require('express');
const { getMyCredits } = require('../controllers/creditController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/my-credits', protect, getMyCredits);

module.exports = router;
