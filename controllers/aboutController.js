/**
 * @file controllers/aboutController.js
 * @project Cost_Manager_REST_API
 * @description Controller for returning the developers team info.
 */

/**
 * Returns hardcoded team member info.
 *
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} JSON array of team members (first_name, last_name)
 */
const getAboutInfo = (req, res) => {
    res.json([
        { first_name: 'Itay', last_name: 'Vazana' },
        { first_name: 'Arthur', last_name: 'Blitsman' }
    ]);
};

module.exports = { getAboutInfo };
