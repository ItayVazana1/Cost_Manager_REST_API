/**
 * @file userRoutes.js
 * @description Routes for user operations
 */

const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userController');

/**
 * @route GET /api/users/:id
 * @description Get user info + total costs
 */
router.get('/users/:id', getUserInfo);

module.exports = router;
