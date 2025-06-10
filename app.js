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
 * Root test route
 * @route GET /
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {string} Confirmation message
 */
app.get('/', (req, res) => {
    res.send('Cost Manager API is running...');
});

/**
 * @route POST /api/add
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with added cost or error
 */
app.use('/api', costRoutes);

/**
 * @route GET /api/report
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with grouped monthly report
 */
app.use('/api', reportRoutes);

/**
 * @route GET /api/users/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with user info and total cost
 */
app.use('/api', userRoutes);

/**
 * @route GET /api/about
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} JSON with team member names
 */
app.use('/api', aboutRoutes);

/**
 * Global 404 handler for unknown endpoints
 * @route ALL *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with error message
 */
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;