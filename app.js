/**
 * @file app.js
 * @description Entry point of the Cost Manager REST API. Sets up Express and MongoDB connection.
 */

const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Cost Manager API is running...');
});

module.exports = app;

