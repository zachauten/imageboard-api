const request = require('supertest');
const app = require('../app')

describe('GET v1/boards', () => {
    test('should respond with 200', () => {
        return request(app).get('/v1/boards').expect(200);
    });
});

// describe('POST v1/boards', () => {
//     test('should respond with 201', () => {
//         return request(app).post('/v1/boards')
//         .send({name: 'testboard'})
//         .set('')
//         .expect(201);
//     });
// });