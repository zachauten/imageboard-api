// const app = require('../app');
const boardController = require('../controllers/boardController');


describe('boardController.getAllBoards', () => {


    // happy path
    test('should respond with 200 and results from boardData.getAllBoards', async () => {
        jest.unmock('../data/boardData');
        var boardData = require.requireActual('../data/boardData');

        var expectedResponse = "foo";

        var mockResponse = {
            status: (code) => {
                this.code = code;
                return this;
            },
            send: (body) => {
                this.body = body;
                return this;
            }
        };
        boardData.getAllBoards = jest.fn(() => expectedResponse);

        return await boardController.getAllBoards({}, mockResponse, () => {
            expect(mockResponse.code).toBe(200);
            expect(mockResponse.body).toBe('foo');
        });
    });
});
