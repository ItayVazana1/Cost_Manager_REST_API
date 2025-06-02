/**
 * @file reportController.js
 * @description Controller for handling monthly cost reports per user.
 */

const Cost = require('../models/Cost');

/**
 * @function getMonthlyReport
 * @description Returns all cost items of a specific user for a given month/year, grouped by category.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Monthly report grouped by category or error
 */
const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing id, year or month parameter' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const costs = await Cost.find({
            userid: id,
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
                    day: day
                });
            }
        });

        const result = {
            userid: Number(id),
            year: Number(year),
            month: Number(month),
            costs: categories.map(cat => ({ [cat]: grouped[cat] }))
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMonthlyReport };
