const mongoose = require('mongoose');
require('dotenv').config();

/**
 * @file config/db.js
 * @description Connects to MongoDB using Mongoose.
 */

/**
 * Connects to MongoDB using Mongoose and logs the result.
 * @function
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
