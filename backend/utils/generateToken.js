/**
 * generateToken.js
 *
 * Creates a signed JWT for a given user ID.
 * The token payload is intentionally minimal — only the user ID is stored
 * inside the token. The full user object is fetched from the DB via
 * authMiddleware to ensure stale data never silently persists.
 *
 * @param   {string} userId  - MongoDB ObjectId string of the user
 * @returns {string}         - Signed JWT
 */

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
