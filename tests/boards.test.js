describe('boardController', () => {
    const boardController = require('../controllers/boardController');
    const boardData = require('../data/boardData');
    jest.mock('../data/boardData');

    test('getAllBoards happy path', async () => {
        const expectedResponse = 'foo';
        boardData.getAllBoards.mockReturnValue(expectedResponse);
        var mockResponse = new MockResponse();
        await boardController.getAllBoards({}, mockResponse);
        expect(boardData.getAllBoards).toBeCalledTimes(1);
        expect(mockResponse.code).toBe(200);
        expect(mockResponse.body).toBe(expectedResponse);

    });

    test('getAllBoards server error', async () => {
        const mockError = new Error('Error thrown inside boardData.getAllBoards');
        boardData.getAllBoards.mockImplementation(() => {
            throw mockError;
        });
        var mockResponse = new MockResponse();
        try {
            await boardController.getAllBoards({}, mockResponse);
        } catch (error) {
            expect(boardData.getAllBoards).toBeCalledTimes(1);
            expect(error).toEqual(mockError);
            expect(mockResponse.code).toBe(500);
            expect(mockResponse.body).toBeNull();
        }
    });

    test('getOneBoard happy path', async () => {
        const expectedResponse = 'bar';
        boardData.getOneBoard.mockReturnValue(expectedResponse);
        var mockResponse = new MockResponse();
        var mockRequest = new MockRequest({ 'board': 'test' }, {});
        await boardController.getOneBoard(mockRequest, mockResponse);
        expect(boardData.getOneBoard).toBeCalledTimes(1);
        expect(mockResponse.code).toBe(200);
        expect(mockResponse.body).toBe(expectedResponse);
    });

    test('getOneBoard server error', async () => {
        const mockError = new Error('Error thrown inside boardData.getOneBoard');
        boardData.getOneBoard.mockImplementation(() => {
            throw mockError;
        });
        var mockRequest = new MockRequest({ 'board': 'test' });
        var mockResponse = new MockResponse();
        try {
            await boardController.getOneBoard(mockRequest, mockResponse);
        } catch (error) {
            expect(boardData.getOneBoard).toBeCalledTimes(1);
            expect(error).toEqual(mockError);
            expect(mockResponse.code).toBe(500);
            expect(mockResponse.body).toBeNull();
        }
    });

    test('createBoard happy path', async () => {
        boardData.createBoard.mockReturnValue(null);
        var mockRequest = new MockRequest({}, { 'name': 'test' });
        var mockResponse = new MockResponse();
        await boardController.createBoard(mockRequest, mockResponse);
        expect(boardData.createBoard).toBeCalledTimes(1);
        expect(mockResponse.code).toBe(201);
    });

    test('createBoard no board name in request body', async () => {
        const missingNameError = new Error('Missing board name.');
        boardData.createBoard.mockReturnValue();
        var mockRequest = new MockRequest({}, {});
        var mockResponse = new MockResponse();
        try {
            await boardController.createBoard(mockRequest, mockResponse);
        } catch (error) {
            expect(boardData.createBoard).toBeCalledTimes(1);
            expect(error).toEqual(missingNameError);
            expect(mockResponse.code).toBe(400);
            expect(mockResponse.body).toBeUndefined();
        }
    });

    test('createBoard server error', async () => {
        const mockError = new Error('Error thrown inside boardData.createBoard');
        boardData.createBoard.mockImplementation(() => {
            throw mockError;
        });
        var mockRequest = new MockRequest({}, {'name': 'test'});
        var mockResponse = new MockResponse();
        try {
            await boardController.createBoard(mockRequest, mockResponse);
        } catch (error) {
            expect(boardData.createBoard).toBeCalledTimes(1);
            expect(error).toEqual(mockError);
            expect(mockResponse.code).toBe(500);
            expect(mockResponse.body).toBeUndefined();
        }
    });

    test('getPage page 1', async () => {

    });

    test('getPage invalid page number', async () => {

    });

    test('getPage server error', async () => {

    });
});

function MockResponse() {
    this.status = (code) => {
        this.code = code;
        return this;
    },
        this.send = (body) => {
            this.body = body;
            return this;
        }
};

function MockRequest(params, body) {
    this.params = params;
    this.body = body;
}
