const router = require('express').Router();
const db = require('../database');

// get a list of all boards
router.get('/', async (req, res, next) => {
    const { rows } = await db.query('select * from boards;');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

// create a new board
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        const error = new Error('Missing board name.');
        error.httpStatusCode = 400;
        return next(error);
    }
    await db.query('insert into boards values($1);', [name]);
    res.status(201).send();
});

// Get threads on a board
router.get('/:board', async (req, res) => {
    const { board } = req.params;
    const { rows } = await db.query('select * from threads where board = $1;', [board]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

//TODO: implement pagination
// get the threads on a page of a board
router.get('/boards/:board/:page(\d+)', async (req, res) => {
    const {board} = req.params;
    const { rows } = await db.query('select * from boards where name = $1;', [board]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

module.exports = router;
