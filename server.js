/**
 * @file server.js
 * @project Cost_Manager_REST_API
 * @description
 * Starts the Express server and listens on the specified port from environment variables.
 * Uses the main Express app exported from app.js.
 */

require('dotenv').config(); // Load environment variables from .env
const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server on the given port.
 *
 * @function
 * @param {number} PORT - The port number to listen on
 * @returns {void}
 */
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.info(`✅ Server is running on port ${PORT}`);
    }
});
