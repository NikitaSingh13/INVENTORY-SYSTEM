const mongoose = require('mongoose');

/**
 * Database Configuration
 * Establishes connection to MongoDB Atlas
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB Connection Failed!');
    console.error(`Error: ${error.message}`);
    
    if (error.message.includes('IP')) {
      console.error('IP Whitelist Issue Detected');
      console.error('Please add your IP address to MongoDB Atlas Network Access');
      console.error('Visit: https://cloud.mongodb.com -> Network Access -> Add IP Address');
    }
    
    process.exit(1);
  }
};

/**
 * Connection event handlers
 */
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB error: ${err.message}`);
});

module.exports = connectDB;
