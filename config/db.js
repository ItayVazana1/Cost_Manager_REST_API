/**
 * @file config/db.js
 * @project Cost_Manager_REST_API
 * @description Connects to MongoDB using Mongoose.
 */

const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to MongoDB using Mongoose.
 *
 * @function connectDB
 * @param {void}
 * @returns {Promise<void>} Resolves when the connection is successful
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        if (process.env.NODE_ENV !== 'test') {
            console.info('✅ MongoDB connected successfully');
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.error('❌ MongoDB connection error:', error.message);
        }
        process.exit(1);
    }
};

module.exports = connectDB;
