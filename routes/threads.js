const { Router } = require('express');
const router = new Router();
const pool = require('../database');

// get list of threads on a board
router.get('/boards/:boardName/threads', function (req, res, next) {
    (async () => {
        const { rows } = await pool.query('select * from threads where board = \'' + req.params.boardName + '\';');
        var json = JSON.stringify(rows);
        res.status(200).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

// get a specific thread
router.get('/boards/:boardName/threads/:threadId(\d+)', function (req, res, next) {
    (async () => {
        const { rows } = await pool.query('select * from threads where id = \'' + req.params.threadId + '\';');
        var json = JSON.stringify(rows);
        res.status(200).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

// create a thread
router.post('/boards/:boardName/threads', function (req, res, next) {
    const title = req.body.title;
    const board = req.params.boardName;
    if (!title) {
        const error = new Error('New thread must have title.');
        error.httpStatusCode = 400;
        return next(error);
    }
    (async () => {
        await pool.query('insert into threads(title, board) values(' + title + ', ' + board + ');');
        res.status(201).send();
    })().catch(e => setImmediate(() => { throw e }))
});

// create a post in a thread
router.post('/boards/:boardName/threads/:threadId(\d+)', function (req, res, next) {
    const name = req.body.name;
    const commentary = req.body.commentary;
    const thread = req.params.threadId;
    (async () => {
        await pool.query('insert into posts(name, commentary, thread) values(\''
            + name + '\',\'' + commentary + '\'' + thread + '\');');
        res.status(201).send();
    })().catch(e => setImmediate(() => { throw e }))
});

module.exports = router;