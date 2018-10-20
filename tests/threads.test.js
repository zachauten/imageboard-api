describe('threadController', () => {
    const threadController = require('../controllers/threadController')
    const threadData = require('../data/threadData')
    const { MockRequest, MockResponse } = require('../tests/mocks')
    jest.mock('../data/threadData')

    test('getOneThread happy path', async () => {
        const expectedResponse = 'foo'
        threadData.getOneThread.mockReturnValue(expectedResponse)
        var mockRequest = new MockRequest({ thread: 'thread' }, {})
        var mockResponse = new MockResponse()
        await threadController.getOneThread(mockRequest, mockResponse)
        expect(threadData.getOneThread).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(200)
        expect(mockResponse.body).toBe(expectedResponse)
    })

    test('getOneThread server error', async () => {
        const mockError = new Error(
            'Error thrown inside thradData.getOneThread'
        )
        threadData.getOneThread.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest({ thread: 'thread' }, {})
        var mockResponse = new MockResponse()
        await threadController.getOneThread(mockRequest, mockResponse)
        expect(threadData.getOneThread).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(500)
        expect(mockResponse.body).toBeUndefined()
    })

    test('createThread happy path', async () => {
        threadData.createThread.mockReturnValue()
        var mockRequest = new MockRequest(
            {},
            { title: 'title', board: 'board' }
        )
        var mockResponse = new MockResponse()
        await threadController.createThread(mockRequest, mockResponse)
        expect(threadData.createThread).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(201)
    })

    test('createThread without title', async () => {
        const missingTitleError = new Error('New thread must have title.')
        threadData.createThread.mockReturnValue()
        var mockRequest = new MockRequest({}, {})
        var mockResponse = new MockResponse()
        try {
            await threadController.createThread(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(missingTitleError)
        }
        expect(mockResponse.code).toBe(400)
        expect(mockResponse.body).toBeUndefined()
        expect(threadData.createThread).toBeCalledTimes(0)
    })

    test('createThread server error', async () => {
        const mockError = new Error(
            'Error thrown inside threadData.createThread'
        )
        threadData.createThread.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest(
            {},
            { title: 'title', board: 'board' }
        )
        var mockResponse = new MockResponse()
        try {
            await threadController.createThread(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(mockError)
        }
        expect(mockResponse.code).toBe(500)
        expect(mockResponse.body).toBeUndefined()
        expect(threadData.createThread).toBeCalledTimes(1)
    })

    test('createPost happy path', async () => {
        threadData.createPost.mockReturnValue()
        var mockRequest = new MockRequest(
            { thread: 'thread' },
            { name: 'name', commentary: 'commentary' }
        )
        var mockResponse = new MockResponse()
        await threadController.createPost(mockRequest, mockResponse)
        expect(threadData.createPost).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(201)
    })

    test('createPost server error', async () => {
        const mockError = new Error('Error thrown inside threadData.createPost')
        threadData.createPost.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest(
            { thread: 'thread' },
            { name: 'name', commentary: 'commentary' }
        )
        var mockResponse = new MockResponse()
        try {
            await threadController.createPost(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(mockError)
        }
        expect(mockResponse.code).toBe(500)
        expect(mockResponse.body).toBeUndefined()
        expect(threadData.createPost).toBeCalledTimes(1)
    })
})
