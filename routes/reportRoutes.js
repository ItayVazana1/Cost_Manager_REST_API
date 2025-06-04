/**
 * @file routes/reportRoutes.js
 * @project Cost_Manager_REST_API
 * @description Route definition for retrieving monthly report by user.
 */

const express = require('express');
const { getMonthlyReport } = require('../controllers/reportController');

const router = express.Router();

/**
 * @route GET /api/report
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} JSON response with user's monthly costs grouped by category
 */
router.get('/report', getMonthlyReport);

module.exports = router;
