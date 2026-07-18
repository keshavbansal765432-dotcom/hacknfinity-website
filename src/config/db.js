const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hacknfinity';
  
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000 // Quick timeout to fail fast and fallback
    });
    console.log('MongoDB connected successfully!');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('⚠️  Database connection failed. Server will run in MOCK-DATABASE mode for offline local testing.');
    return false;
  }
};

module.exports = connectDB;
