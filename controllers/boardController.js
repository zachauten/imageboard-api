const boardData = require('../data/boardData');

module.exports.getAllBoards = async (req, res) => {
    try {
        let json = await boardData.getAllBoards();
        res.status(200);
        res.send(json);    
    } catch (error) {
        console.log(error);
    }
};

module.exports.getOneBoard = async (req, res) => {
    const { board } = req.params;
    try {
        let json = await boardData.getOneBoard(board);
        res.status(200).send(json);
    } catch (error) {
        console.log(error);
    }
};

module.exports.createBoard = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Missing board name.');
    }
    try {
        await boardData.createBoard(name);
        res.status(201).send();    
    } catch (error) {
        console.log(error);
    }
};

module.exports.getPage = async (req, res) => {
    const { board } = req.params;
    const page = parseInt(req.params.page);
    const pageSize = 5;
    const offset = pageSize * (page - 1);
    if (page < 1) {
        res.status(400);
        throw new Error('Page must be an integer greater than 0.');
    }
    try {
        let json = await boardData.getPage(board, pageSize, offset);
        res.status(200).send(json);
    } catch (error) {
        console.log(error);
    }
};
