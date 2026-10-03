/**
 * courseRoutes.js
 *
 *   GET    /api/courses        → getCourses     (protect)
 *   POST   /api/courses        → createCourse   (protect + admin)
 *   GET    /api/courses/:id    → getCourseById  (protect)
 *   PUT    /api/courses/:id    → updateCourse   (protect + admin)
 *   DELETE /api/courses/:id    → deleteCourse   (protect + admin)
 */

const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
const { authorise } = require('../middlewares/roleMiddleware');

const router = express.Router();

// List and create — same base path
router
  .route('/')
  .get(protect, getCourses)
  .post(protect, authorise('admin'), createCourse);

// Single course — read, update, delete
router
  .route('/:id')
  .get(protect, getCourseById)
  .put(protect, authorise('admin'), updateCourse)
  .delete(protect, authorise('admin'), deleteCourse);

module.exports = router;
