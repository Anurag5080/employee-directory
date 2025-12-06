const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database
 * @returns {Promise} Connection promise
 */
const connectDB = async () => {
  try {
    // Connection URI - using local MongoDB by default
    // In production, this should be in environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_directory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;