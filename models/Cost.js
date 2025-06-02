/**
 * @file models/Cost.js
 * @project Cost_Manager_REST_API
 * @description
 * Mongoose schema and model definition for the 'Cost' collection.
 * Each cost item is associated with a user and includes a category, description, amount, and date.
 */

const mongoose = require('mongoose');

/**
 * Allowed categories for cost items.
 * @type {string[]}
 */
const ALLOWED_CATEGORIES = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * Cost schema definition.
 * @type {mongoose.Schema}
 */
const costSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ALLOWED_CATEGORIES
    },
    sum: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: () => new Date()
    }
}, { versionKey: false });

/**
 * Mongoose model for the 'costs' collection.
 * @const
 */
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
