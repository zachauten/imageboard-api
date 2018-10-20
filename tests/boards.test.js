describe('boardController', () => {
    const boardController = require('../controllers/boardController')
    const boardData = require('../data/boardData')
    const { MockRequest, MockResponse } = require('../tests/mocks')
    jest.mock('../data/boardData')

    test('getAllBoards happy path', async () => {
        const expectedResponse = 'foo'
        boardData.getAllBoards.mockReturnValue(expectedResponse)
        var mockResponse = new MockResponse()
        await boardController.getAllBoards({}, mockResponse)
        expect(boardData.getAllBoards).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(200)
        expect(mockResponse.body).toBe(expectedResponse)
    })

    test('getAllBoards server error', async () => {
        const mockError = new Error(
            'Error thrown inside boardData.getAllBoards'
        )
        boardData.getAllBoards.mockImplementation(() => {
            throw mockError
        })
        var mockResponse = new MockResponse()
        try {
            await boardController.getAllBoards({}, mockResponse)
        } catch (error) {
            expect(error).toEqual(mockError)
        }
        expect(boardData.getAllBoards).toBeCalledTimes(1)
        expect(mockResponse.code).toBeUndefined()
    })

    test('getOneBoard happy path', async () => {
        const expectedResponse = 'bar'
        boardData.getOneBoard.mockReturnValue(expectedResponse)
        var mockResponse = new MockResponse()
        var mockRequest = new MockRequest({ board: 'test' }, {})
        await boardController.getOneBoard(mockRequest, mockResponse)
        expect(boardData.getOneBoard).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(200)
        expect(mockResponse.body).toBe(expectedResponse)
    })

    test('getOneBoard server error', async () => {
        const mockError = new Error('Error thrown inside boardData.getOneBoard')
        boardData.getOneBoard.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest({ board: 'test' })
        var mockResponse = new MockResponse()
        try {
            await boardController.getOneBoard(mockRequest, mockResponse)
        } catch (error) {
            expect(boardData.getOneBoard).toBeCalledTimes(1)
            expect(error).toEqual(mockError)
            expect(mockResponse.code).toBeUndefined()
        }
    })

    test('createBoard happy path', async () => {
        boardData.createBoard.mockReturnValue()
        var mockRequest = new MockRequest({}, { name: 'test' })
        var mockResponse = new MockResponse()
        await boardController.createBoard(mockRequest, mockResponse)
        expect(boardData.createBoard).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(201)
    })

    test('createBoard no board name in request body', async () => {
        const missingNameError = new Error('Missing board name.')
        boardData.createBoard.mockReturnValue('foo')
        var mockRequest = new MockRequest({}, {})
        var mockResponse = new MockResponse()
        try {
            await boardController.createBoard(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(missingNameError)
        }
        expect(mockResponse.code).toBe(400)
        expect(mockResponse.body).toBeUndefined()
        expect(boardData.createBoard).toBeCalledTimes(0)
    })

    test('createBoard server error', async () => {
        const mockError = new Error('Error thrown inside boardData.createBoard')
        boardData.createBoard.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest({}, { name: 'test' })
        var mockResponse = new MockResponse()
        try {
            await boardController.createBoard(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(mockError)
        }
        expect(boardData.createBoard).toBeCalledTimes(1)
        expect(mockResponse.code).toBeUndefined()
    })

    test('getPage happy path', async () => {
        const mockData = 'page'
        boardData.getPage.mockReturnValue(mockData)
        var mockRequest = new MockRequest({ board: 'testboard', page: 1 }, {})
        var mockResponse = new MockResponse()
        await boardController.getPage(mockRequest, mockResponse)
        expect(boardData.getPage).toBeCalledTimes(1)
        expect(mockResponse.code).toBe(200)
        expect(mockResponse.body).toBe(mockData)
    })

    test('getPage invalid page number', async () => {
        const pageNumberError = new Error(
            'Page must be an integer greater than 0.'
        )
        boardData.getPage.mockReturnValue('foo')
        var mockRequest = new MockRequest({ board: 'testboard', page: 0 }, {})
        var mockResponse = new MockResponse()
        try {
            await boardController.getPage(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(pageNumberError)
        }
        expect(boardData.getPage).toBeCalledTimes(0)
        expect(mockResponse.code).toBe(400)
        expect(mockResponse.body).toBeUndefined()
    })

    test('getPage server error', async () => {
        const mockError = new Error('Error thrown inside boardData.getPage')
        boardData.getPage.mockImplementation(() => {
            throw mockError
        })
        var mockRequest = new MockRequest({ board: 'testboard', page: 1 }, {})
        var mockResponse = new MockResponse()
        try {
            await boardController.getPage(mockRequest, mockResponse)
        } catch (error) {
            expect(error).toEqual(mockError)
        }
        expect(boardData.getPage).toBeCalledTimes(1)
        expect(mockResponse.code).toBeUndefined()
    })
})
