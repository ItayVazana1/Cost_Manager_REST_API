/**
 * @file models/Cost.js
 * @project Cost_Manager_REST_API
 * @description Mongoose schema and model definition for the 'Cost' collection.
 */

const mongoose = require('mongoose');

/**
 * Allowed categories for cost items.
 * @type {string[]}
 */
const ALLOWED_CATEGORIES = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * Cost schema definition.
 *
 * @constant
 * @type {mongoose.Schema}
 * @param {void}
 * @returns {mongoose.Schema} Mongoose schema object for cost items
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
 *
 * @const
 * @returns {mongoose.Model} Cost model
 */
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
