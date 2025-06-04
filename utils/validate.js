/**
 * @file utils/validate.js
 * @description Validation helpers for cost item input.
 */

/**
 * Validates input for adding a new cost item.
 *
 * @function
 * @param {Object} data - The request body
 * @param {number} data.userid - The user ID
 * @param {string} data.description - Description of the cost
 * @param {string} data.category - Category of the cost
 * @param {number} data.sum - Cost amount
 * @param {string|Date} [data.date] - Optional date string
 * @returns {{ valid: boolean, error?: string }} Validation result
 */
const validateCostInput = (data) => {
    const { userid, description, category, sum, date } = data;
    const validCategories = ['food', 'health', 'housing', 'sport', 'education'];

    if (typeof userid !== 'number') {
        return { valid: false, error: 'userid must be a number' };
    }

    if (typeof description !== 'string' || description.trim() === '') {
        return { valid: false, error: 'description is required and must be a string' };
    }

    if (!validCategories.includes(category)) {
        return { valid: false, error: 'category must be one of the predefined categories' };
    }

    if (typeof sum !== 'number' || sum < 0) {
        return { valid: false, error: 'sum must be a non-negative number' };
    }

    if (date && isNaN(new Date(date))) {
        return { valid: false, error: 'date must be a valid date string or omitted' };
    }

    return { valid: true };
};

module.exports = { validateCostInput };
