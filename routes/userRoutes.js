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
 * @description Get user information and total cost summary
 */
router.get('/users/:id', getUserInfo);

module.exports = router;
