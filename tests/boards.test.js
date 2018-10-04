const request = require('supertest');
const app = require('../app')

describe('GET v1/boards', () => {
    test('should respond with 200', () => {
        return request(app).get('/v1/boards').expect(200);
    });
});
