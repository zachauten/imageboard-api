describe('threadController', () => {
    const threadController = require('../controllers/threadController')
    const threadData = require('../data/threadData')
    const { MockRequest, MockResponse } = require('../tests/mocks')
    jest.mock('../data/threadData')

    test('getOneThread happy path', async () => {})

    test('getOneThread server error', async () => {})

    test('createThread happy path', async () => {})

    test('createThread without title', async () => {})

    test('createThread server error', async () => {})

    test('createPost happy path', async () => {})

    test('createPost server error', async () => {})
})
