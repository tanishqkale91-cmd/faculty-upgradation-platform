/**
 * Enrollment Model
 *
 * Tracks a faculty member's enrollment in a course.
 * Stores both overall progress (0–100%) and a list of
 * completed module IDs so per-module progress is queryable.
 */

const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Faculty reference is required'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
    },
    status: {
      type: String,
      enum: ['enrolled', 'in-progress', 'completed', 'dropped'],
      default: 'enrolled',
    },
    // Overall progress percentage (0–100), calculated from completed modules
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    // Array of module ObjectIds that the faculty has completed
    completedModules: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    certificateUrl: {
      type: String, // set when status becomes 'completed'
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent a faculty member from enrolling in the same course twice
enrollmentSchema.index({ faculty: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
