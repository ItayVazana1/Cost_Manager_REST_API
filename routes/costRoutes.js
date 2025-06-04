/**
 * @file routes/costRoutes.js
 * @project Cost_Manager_REST_API
 * @description Route definitions for adding cost items.
 */

const express = require('express');
const { addCost } = require('../controllers/costController');

const router = express.Router();

/**
 * @route POST /api/add
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} JSON response with the added cost or an error
 */
router.post('/add', addCost);

module.exports = router;
