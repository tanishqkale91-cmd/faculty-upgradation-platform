/**
 * MongoDB connection setup using Mongoose.
 *
 * Connects to the URI specified in the MONGO_URI environment variable.
 * Exits the process if the connection fails — this is intentional so that
 * the server does not silently start without a database.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
