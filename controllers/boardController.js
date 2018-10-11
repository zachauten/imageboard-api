const boardData = require('../data/boardData');

module.exports.getAllBoards = async (req, res) => {
    let json = await boardData.getAllBoards();
    res.status(200);
    res.send(json);
};

module.exports.getOneBoard = async (req, res) => {
    const { board } = req.params;
    let json = await boardData.getOneBoard(board);
    res.status(200).send(json);
};

module.exports.createBoard = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Missing board name.');
    }
    await boardData.createBoard(name);
    res.status(201).send();
};

// TODO: 
module.exports.getPage = async (req, res) => {
};