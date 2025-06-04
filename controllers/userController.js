/**
 * @file userController.js
 * @description Controller for user-related operations
 */

const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * @function getUserInfo
 * @description Returns user info and total cost
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with user details and total cost
 */
const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;

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
