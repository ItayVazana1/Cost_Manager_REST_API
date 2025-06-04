/**
 * @file __tests__/about.test.js
 * @project Cost_Manager_REST_API
 * @description Unit test for GET /api/about endpoint.
 */

const request = require('supertest');
const app = require('../app');

describe('GET /api/about', () => {
    /**
     * Should return an array of team members with first_name and last_name only.
     *
     * @function
     * @param {Function} done - Callback for async test (not used but required for JSDoc check)
     * @returns {Promise<void>}
     */
    it('should return a list of team members with first_name and last_name only', async () => {
        const res = await request(app).get('/api/about');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        res.body.forEach(member => {
            expect(member).toHaveProperty('first_name');
            expect(member).toHaveProperty('last_name');
            expect(Object.keys(member).length).toBe(2); // Ensure no extra fields
        });
    });
});
