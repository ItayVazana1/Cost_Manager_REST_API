/**
 * @file models/User.js
 * @project Cost_Manager_REST_API
 * @description
 * Mongoose schema and model definition for the 'User' collection.
 * Each user has basic personal information and a unique numeric ID.
 */

const mongoose = require('mongoose');

/**
 * User schema definition.
 * @type {mongoose.Schema}
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
        type: Date,
        required: true
    },
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        required: true
    }
}, { versionKey: false });

/**
 * Mongoose model for the 'users' collection.
 * @const
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
