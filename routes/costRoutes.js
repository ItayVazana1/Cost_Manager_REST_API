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
 * @description Add a new cost item to the database
 */
router.post('/add', addCost);

module.exports = router;
