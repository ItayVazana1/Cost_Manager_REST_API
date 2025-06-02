/**
 * @file server.js
 * @project Cost_Manager_REST_API
 * @description
 * Starts the Express server and listens on the specified port from environment variables.
 * Uses the main Express app exported from app.js.
 */

const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * Start the Express server.
 * @function
 * @returns {void}
 */
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
