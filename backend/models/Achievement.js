/**
 * Achievement Model
 *
 * Represents a milestone or badge earned by a faculty member.
 * Achievements are awarded server-side by event triggers
 * (e.g., completing a first course, reaching 10 credits).
 */

const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Faculty reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    // Icon identifier or URL — e.g. "star", "trophy", or a CDN URL
    icon: {
      type: String,
      default: 'badge',
    },
    awardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Achievement', achievementSchema);
