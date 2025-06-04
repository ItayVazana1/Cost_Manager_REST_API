/**
 * @file routes/aboutRoutes.js
 * @project Cost_Manager_REST_API
 * @description Route definition for retrieving developers team info.
 */

const express = require('express');
const { getAboutInfo } = require('../controllers/aboutController');

const router = express.Router();

/**
 * @route GET /api/about
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} JSON array of team members
 */
router.get('/about', getAboutInfo);

module.exports = router;
