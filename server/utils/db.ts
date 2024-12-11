import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl: string = process.env.DATABASE_URL || '';

const connectDB = async () => {
  try {
    // Configuring Mongoose connection options for enhanced reliability
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Socket idle timeout
      connectTimeoutMS: 10000, // Connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    await mongoose.connect(dbUrl, options);
    console.log('Database connected successfully!');
  } catch (error: any) {
    console.error(`Database connection error: ${error.message}`);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
