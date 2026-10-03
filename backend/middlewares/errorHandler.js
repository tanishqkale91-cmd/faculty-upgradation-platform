/**
 * Global error handling middleware.
 *
 * Catches errors forwarded via next(err) from any route or middleware.
 * Returns a consistent JSON error shape so the frontend can rely on it.
 */

const errorHandler = (err, req, res, next) => {
  // If the error already set a status code use it, otherwise default to 500
  const statusCode = err.statusCode || res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Stack trace is only included in development for debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
