/**
 * roleMiddleware.js
 *
 * Role-based access control (RBAC) guard.
 * Must be used AFTER the `protect` middleware so that req.user is populated.
 *
 * Usage (in route files):
 *   router.get('/admin-only', protect, authorise('admin'), handler);
 *   router.get('/both',       protect, authorise('admin', 'faculty'), handler);
 *
 * On success  → calls next()
 * On failure  → returns 403 JSON error
 */

const authorise = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied — role '${req.user.role}' is not permitted to perform this action`,
      });
    }
    next();
  };
};

module.exports = { authorise };
