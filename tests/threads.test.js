const request = require('supertest');
const app = require('../app')

const boardName = 'firstboard';

describe('GET v1/boards/' + boardName +'/threads', () => {
    test('should respond with 200', () => {
        return request(app).get('/v1/boards/' + boardName +'/threads').expect(200);
    });
});
