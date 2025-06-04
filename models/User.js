/**
 * @file models/User.js
 * @project Cost_Manager_REST_API
 * @description Mongoose schema and model definition for the 'User' collection.
 */

const mongoose = require('mongoose');

/**
 * User schema definition.
 * Each user has: id, first_name, last_name, and optionally birthday & marital_status.
 *
 * @constant
 * @type {mongoose.Schema}
 * @param {void}
 * @returns {mongoose.Schema} Mongoose schema for User collection
 */
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: Date
    },
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed']
    }
}, { versionKey: false });

/**
 * Mongoose model for the 'users' collection.
 *
 * @const
 * @returns {mongoose.Model} User model
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
