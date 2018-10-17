const boardController = require('../controllers/boardController');

describe('boardController.getAllBoards', () => {

    test('should respond with 200 and results from boardData.getAllBoards', async () => {
        jest.unmock('../data/boardData');
        var boardData = require.requireActual('../data/boardData');

        var expectedResponse = 'foo';
        var mockResponse = new MockResponse();

        boardData.getAllBoards = jest.fn(() => expectedResponse);

        return await boardController.getAllBoards({}, mockResponse, () => {
            expect(boardData.getAllBoards).toBeCalledTimes(1);
            expect(mockResponse.code).toBe(200);
            expect(mockResponse.body).toBe('foo');
        });
    });

    test('should respond with 500 if an exception is thrown', async () => {

    });
});

describe('boardController.getOneBoard', () => {

    test('should respond with 200 and results from boardData.getOneBoard', async () => {
        jest.unmock('../data/boardData');
        var boardData = require.requireActual('../data/boardData');

        var expectedResponse = 'foo';
        var mockResponse = new MockResponse();
        var mockRequest = new MockRequest({'board': 'foo'}, {})

        boardData.getOneBoard = jest.fn(() => expectedResponse);

        return await boardController.getOneBoard(mockRequest, mockResponse, () => {
            expect(boardData.getOneBoard).toBeCalledTimes(1);
            expect(mockResponse.code).toBe(200);
            expect(mockResponse.body).toBe('foo');
        });
    });

    test('should respond with 400 if no board name is passed in request body', async () => {

    });

    test('should respond with 500 if an exception is thrown', async () => {

    });

});

describe('boardController.createBoard', () => {

});

describe('boardController.getPage', () => {

});

function MockResponse() {
    this.status = (code) => {
        this.code = code;
        return this;
    },
    this.send =  (body) => {
        this.body = body;
        return this;
    }
};

function MockRequest(params, body) {
    this.params = params;
    this.body = body;
}
