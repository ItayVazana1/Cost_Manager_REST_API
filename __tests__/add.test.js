/**
 * @file __tests__/add.test.js
 * @project Cost_Manager_REST_API
 * @updated June 2, 2025
 * @description
 * Unit tests for POST /api/add endpoint using Supertest and Jest.
 */

const request = require('supertest');
const app = require('../app');

describe('POST /api/add', () => {
    it('should add a valid cost item and return it', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                description: 'test item',
                category: 'food',
                sum: 10
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('userid', 123123);
        expect(response.body).toHaveProperty('description', 'test item');
        expect(response.body).toHaveProperty('category', 'food');
        expect(response.body).toHaveProperty('sum', 10);
        expect(response.body).toHaveProperty('date');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({
                description: 'missing fields',
                sum: 10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Missing required fields.');
    });
});
