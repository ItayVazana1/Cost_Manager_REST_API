/**
 * @file app.js
 * @project Cost_Manager_REST_API
 * @description
 * Entry point of the Cost Manager REST API.
 * Initializes Express, connects to MongoDB using environment variables,
 * sets up middleware, and defines base and cost-related routes.
 */

const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const costRoutes = require('./routes/costRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

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

/**
 * Cost routes
 * @route POST /api/add
 */
app.use('/api', costRoutes);

/**
 * Report routes
 * @route GET /api/report
 */
app.use('/api', reportRoutes);

/**
 * User routes
 * @route GET /api/users/:id
 */
app.use('/api', userRoutes);

/**
 * About route
 * @route GET /api/about
 */
app.use('/api', aboutRoutes);

module.exports = app;
