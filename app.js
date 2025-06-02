/**
 * @file app.js
 * @project Cost_Manager_REST_API
 * @description
 * Entry point of the Cost Manager REST API.
 * Initializes Express, sets up middleware, connects to MongoDB using environment variables,
 * and defines a basic test route.
 */

const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

/**
 * Basic test route
 * @route GET /
 * @returns {string} Confirmation message
 */
app.get('/', (req, res) => {
    res.send('Cost Manager API is running...');
});

module.exports = app;
