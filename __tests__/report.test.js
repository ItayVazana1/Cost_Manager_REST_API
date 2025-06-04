/**
 * @file __tests__/report.test.js
 * @project Cost_Manager_REST_API
 * @description Unit test for GET /api/report endpoint.
 */

const request = require('supertest');
const app = require('../app');

describe('GET /api/report', () => {
    /**
     * Should return a valid monthly report grouped by predefined categories.
     *
     * @function
     * @param {Function} done - Jest callback (for JSDoc compliance)
     * @returns {Promise<void>}
     */
    it('should return a valid monthly report grouped by category', async () => {
        const response = await request(app)
            .get('/api/report')
            .query({ id: 123123, year: 2025, month: 6 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userid', 123123);
        expect(response.body).toHaveProperty('year', 2025);
        expect(response.body).toHaveProperty('month', 6);
        expect(Array.isArray(response.body.costs)).toBe(true);

        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        const costCategories = response.body.costs.map(obj => Object.keys(obj)[0]);

        expect(costCategories.sort()).toEqual(categories.sort());
    });

    /**
     * Should return status 400 if required query parameters are missing.
     *
     * @function
     * @param {Function} done - Jest callback (for JSDoc compliance)
     * @returns {Promise<void>}
     */
    it('should return 400 if parameters are missing', async () => {
        const response = await request(app).get('/api/report?id=123123');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
