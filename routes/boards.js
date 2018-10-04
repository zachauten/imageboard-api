const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const boardQueries = require('../data/boardQueries');

router.get('/', asyncMiddleware( async (req, res) => {
    let json = await boardQueries.readBoards();
    res.status(200).send(json);
}));

router.post('/', asyncMiddleware( async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Missing board name.');
    }
    await boardQueries.createBoard(name);
    res.status(201).send();
}));

// Get threads on a board
router.get('/:board', asyncMiddleware( async (req, res) => {
    const { board } = req.params;
    let json = await boardQueries.readBoard(board);
    res.status(200).send(json);
}));

//TODO: implement pagination
// get the threads on a page of a board
router.get('/boards/:board/:page(\\d+)', asyncMiddleware( async (req, res, next) => {
    const {board} = req.params;
    let json = await boardQueries.readPage(board, page);
    res.status(200).send(json);
}));

module.exports = router;
