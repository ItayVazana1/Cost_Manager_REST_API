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
 * @desc Get monthly cost report grouped by category
 */
router.get('/report', getMonthlyReport);

module.exports = router;
