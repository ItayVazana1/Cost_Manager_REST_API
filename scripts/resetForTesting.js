/**
 * @file scripts/resetForTesting.js
 * @project Cost_Manager_REST_API
 * @description Resets the MongoDB database to a clean test state with one mock user (id: 123123).
 */

const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Cost = require("../models/Cost");

/**
 * Resets the MongoDB database for testing:
 * Deletes all users and costs, then inserts one test user.
 *
 * @function run
 * @param {void}
 * @returns {Promise<void>} Resolves when reset is complete
 */
const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        if (process.env.NODE_ENV !== 'test') {
            console.info("🔌 Connected to MongoDB");
        }

        await User.deleteMany({});
        await Cost.deleteMany({});
        if (process.env.NODE_ENV !== 'test') {
            console.info("🧹 Cleared all existing users and costs");
        }

        await User.create({
            id: 123123,
            first_name: "mosh",
            last_name: "israeli",
            birthday: "1990-01-01",
            marital_status: "single"
        });

        if (process.env.NODE_ENV !== 'test') {
            console.info("👤 Inserted test user (id: 123123)");
            console.info("✅ Test environment is now ready");
        }
    } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
            console.error("❌ Failed to reset test state:", err.message);
        }
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

run();
