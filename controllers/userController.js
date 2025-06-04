/**
 * @file controllers/userController.js
 * @project Cost_Manager_REST_API
 * @description Controller for user-related operations
 */

const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * Returns user details and total cost.
 *
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with id, first_name, last_name, and total
 */
const getUserInfo = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const costs = await Cost.find({ userid: userId });
        const total = costs.reduce((sum, item) => sum + item.sum, 0);

        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUserInfo };
