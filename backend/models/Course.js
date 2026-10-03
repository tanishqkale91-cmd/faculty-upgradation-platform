/**
 * Course Model
 *
 * Each course contains an ordered list of modules.
 * Module completion is tracked in the Enrollment model.
 * createdBy references the admin User who added the course.
 */

const mongoose = require('mongoose');

// Sub-document schema for individual modules within a course
const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    duration: {
      type: Number, // in minutes
      default: 0,
    },
    order: {
      type: Number, // display/completion order
      required: true,
    },
    resourceUrl: {
      type: String, // link to video, PDF, or external content
      default: '',
    },
  },
  { _id: true } // each module gets its own _id so enrollment can reference it
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    provider: {
      type: String, // e.g. "NPTEL", "Coursera", "Internal"
      trim: true,
      default: '',
    },
    instructor: {
      type: String, // name of the course instructor / facilitator
      trim: true,
      default: '',
    },
    isPublished: {
      type: Boolean, // controls faculty visibility; admin can draft before publishing
      default: false,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    duration: {
      type: Number, // total course duration in hours
      default: 0,
    },
    credits: {
      type: Number, // credits awarded on completion
      default: 0,
      min: [0, 'Credits cannot be negative'],
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String, // URL to course thumbnail image
      default: '',
    },
    externalUrl: {
      type: String, // link to the course on an external platform
      default: '',
    },
    modules: {
      type: [moduleSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // must be an admin
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
