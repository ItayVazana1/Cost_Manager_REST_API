/**
 * @file controllers/costController.js
 * @project Cost_Manager_REST_API
 * @description
 * Controller to handle adding a new cost item to the database.
 */

const Cost = require('../models/Cost');

/**
 * Adds a new cost item to the database.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the added cost item or error
 */
const addCost = async (req, res) => {
    try {
        const { userid, description, category, sum, date } = req.body;

        if (!userid || !description || !category || !sum) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const newCost = new Cost({
            userid,
            description,
            category,
            sum,
            date
        });

        const saved = await newCost.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addCost };
