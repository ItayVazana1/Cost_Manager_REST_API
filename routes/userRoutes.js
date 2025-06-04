/**
 * @file routes/userRoutes.js
 * @project Cost_Manager_REST_API
 * @description Routes for user operations
 */

const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userController');

/**
 * @route GET /api/users/:id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} JSON response with user info and total cost
 */
router.get('/users/:id', getUserInfo);

module.exports = router;
