const router = require('express-promise-router')();
const db = require('../database');

// get a list of all boards
router.get('/boards', async (req, res) => {
    const { rows } = await db.query('select * from boards;');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
    await pool.end();
});

// create a new board
router.post('/boards', async (req, res) => {
    const board = req.body.name;
    if (!board) {
        const error = new Error('Missing board name.');
        error.httpStatusCode = 400;
        return next(error);
    }
    const { rows } = await pool.query('insert into boards values(\'' + board + '\');');
    var json = JSON.stringify(rows);
    res.status(201).send(json);
});

// get a board by name
router.get('/boards/:board', async (req, res) => {
    const board = req.params.board;
    const { rows } = await pool.query('select * from boards where name = \'' + board + '\';');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

//TODO: implement pagination
// get the threads on a page of a board
router.get('/boards/:board/:page(\d+)', async (req, res) => {
    const board = req.params.board;
    const { rows } = await pool.query('select * from boards where name = \'' + board + '\';');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

module.exports = router;
