const request = require('supertest');
const app = require('../app')

const threadId = 1;

describe('GET v1/threads/' + threadId, () => {
    test('should respond with 200', () => {
        return request(app).get('/v1/threads/' + threadId).expect(200);
    });
});
