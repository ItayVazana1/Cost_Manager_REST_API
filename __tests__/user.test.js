/**
 * @file __tests__/users.test.js
 * @description Unit test for GET /api/users/:id endpoint
 */

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Cost = require('../models/Cost');

describe('GET /api/users/:id', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);

        await User.deleteMany({});
        await User.create({
            id: 123123,
            first_name: 'mosh',
            last_name: 'israeli',
            birthday: '1990-01-01',
            marital_status: 'single'
        });

        await Cost.deleteMany({});
        await Cost.insertMany([
            { userid: 123123, description: 'milk', category: 'food', sum: 10 },
            { userid: 123123, description: 'bread', category: 'food', sum: 8 }
        ]);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoose.disconnect(); // Ensure proper teardown to avoid Jest warnings
    });

    it('should return user info and total cost', async () => {
        const res = await request(app).get('/api/users/123123');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 123123);
        expect(res.body).toHaveProperty('first_name', 'mosh');
        expect(res.body).toHaveProperty('last_name', 'israeli');
        expect(res.body).toHaveProperty('total', 18);
    });

    it('should return 404 for non-existing user', async () => {
        const res = await request(app).get('/api/users/000000');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });
});
