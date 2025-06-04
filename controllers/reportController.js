/**
 * @file controllers/reportController.js
 * @project Cost_Manager_REST_API
 * @description Controller for handling monthly cost reports per user.
 */

const Cost = require('../models/Cost');

/**
 * Returns all cost items of a specific user for a given month/year, grouped by category.
 *
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with monthly report or error
 */
const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        const userId = Number(id);
        const reportYear = Number(year);
        const reportMonth = Number(month);

        if (isNaN(userId) || isNaN(reportYear) || isNaN(reportMonth)) {
            return res.status(400).json({ error: 'id, year, and month must be numbers' });
        }

        const startDate = new Date(reportYear, reportMonth - 1, 1);
        const endDate = new Date(reportYear, reportMonth, 1);

        const costs = await Cost.find({
            userid: userId,
            date: { $gte: startDate, $lt: endDate }
        });

        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        const grouped = {};

        categories.forEach(cat => grouped[cat] = []);

        costs.forEach(item => {
            const day = new Date(item.date).getDate();
            if (grouped[item.category]) {
                grouped[item.category].push({
                    sum: item.sum,
                    description: item.description,
                    day
                });
            }
        });

        const result = {
            userid: userId,
            year: reportYear,
            month: reportMonth,
            costs: categories.map(cat => ({ [cat]: grouped[cat] }))
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMonthlyReport };
