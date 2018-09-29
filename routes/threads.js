const router = require('express-promise-router')();
const pool = require('../database');

// get list of threads on a board
router.get('/boards/:board/threads', async (req, res) => {
    const { board } = req.params;
    const { rows } = await pool.query('select * from threads where board = \'' + board + '\';');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
    await pool.end();
});

// get a specific thread
router.get('/boards/:board/threads/:threadId(\d+)', async (req, res) => {
    const { rows } = await pool.query('select * from threads where id = \'' + req.params.threadId + '\';');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
});

// create a thread
router.post('/boards/:board/threads', async (req, res) => {
    const title = req.body.title;
    const board = req.params.board;
    if (!title) {
        const error = new Error('New thread must have title.');
        error.httpStatusCode = 400;
        return next(error);
    }
    await pool.query('insert into threads(title, board) values(' + title + ', ' + board + ');');
    res.status(201).send();
});

// create a post in a thread
router.post('/boards/:board/threads/:threadId(\d+)', async (req, res) => {
    const name = req.body.name;
    const commentary = req.body.commentary;
    const thread = req.params.threadId;
    await pool.query('insert into posts(name, commentary, thread) values(\''
        + name + '\',\'' + commentary + '\'' + thread + '\');');
    res.status(201).send();
});

module.exports = router;