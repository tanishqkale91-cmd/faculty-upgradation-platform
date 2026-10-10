/**
 * course.test.js — Backend Automated Tests
 *
 * Runs with Node.js built-in test runner:
 *   npm test (or node --test tests/*.test.js)
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const errorHandler = require('../middlewares/errorHandler');

describe('Course Model & Validation Tests', () => {
  it('should validate required fields for Course model', () => {
    const course = new Course({});
    const err = course.validateSync();
    assert.ok(err, 'Validation error should be returned when title is missing');
    assert.ok(err.errors.title, 'Title field should trigger validation error');
  });

  it('should prevent negative credits in Course model', () => {
    const course = new Course({ title: 'Test Course', credits: -5 });
    const err = course.validateSync();
    assert.ok(err, 'Validation error should occur for negative credits');
    assert.ok(err.errors.credits, 'Credits field should trigger min value error');
  });

  it('should set default values for Course model', () => {
    const course = new Course({ title: 'Test Default Values' });
    assert.equal(course.category, 'General');
    assert.equal(course.difficulty, 'beginner');
    assert.equal(course.credits, 0);
    assert.equal(course.isPublished, false);
    assert.equal(course.isActive, true);
  });
});

describe('Enrollment Model & Schema Tests', () => {
  it('should validate required faculty and course ObjectIds in Enrollment model', () => {
    const enrollment = new Enrollment({});
    const err = enrollment.validateSync();
    assert.ok(err, 'Validation error expected when faculty/course are missing');
    assert.ok(err.errors.faculty, 'Faculty is required');
    assert.ok(err.errors.course, 'Course is required');
  });

  it('should set default status to enrolled and progress to 0', () => {
    const mockId1 = new mongoose.Types.ObjectId();
    const mockId2 = new mongoose.Types.ObjectId();
    const enrollment = new Enrollment({ faculty: mockId1, course: mockId2 });
    assert.equal(enrollment.status, 'enrolled');
    assert.equal(enrollment.progress, 0);
  });
});

describe('Error Handler Middleware Tests', () => {
  it('should return 400 status for CastError (invalid ObjectId)', () => {
    const mockCastError = { name: 'CastError', path: '_id' };
    let statusSet = 500;
    let jsonSent = null;

    const res = {
      status(code) {
        statusSet = code;
        return this;
      },
      json(data) {
        jsonSent = data;
        return this;
      },
    };

    errorHandler(mockCastError, {}, res, () => {});

    assert.equal(statusSet, 400);
    assert.equal(jsonSent.success, false);
    assert.match(jsonSent.message, /Invalid ID format/);
  });
});
