const { Router } = require('express');
const router = new Router();
// const { Pool } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/imageboard';
// const pool = new Pool({
//     connectionString: connectionString
// });
const pool = require('../database');

// get a list of all boards
router.get('/boards', function (req, res, next) {
    (async () => {
        const { rows } = await pool.query('select * from boards;');
        var json = JSON.stringify(rows);
        res.status(200).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

// create a new board
router.post('/boards', function (req, res, next) {
    const board = req.body.name;
    if (!board) {
        const error = new Error('Missing board name.');
        error.httpStatusCode = 400;
        return next(error);
    }
    (async () => {
        const { rows } = await pool.query('insert into boards values(\'' + board + '\');');
        var json = JSON.stringify(rows);
        res.status(201).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

// get a board by name
router.get('/boards/:board', function (req, res, next) {
    const board = req.params.board;
    (async () => {
        const { rows } = await pool.query('select * from boards where name = \'' + board + '\';');
        var json = JSON.stringify(rows);
        res.status(200).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

//TODO: implement pagination
// get the threads on a page of a board
router.get('/boards/:board/:page(\d+)', function (req, res, next) {
    const board = req.params.board;
    (async () => {
        const { rows } = await pool.query('select * from boards where name = \'' + board + '\';');
        var json = JSON.stringify(rows);
        res.status(200).send(json);
    })().catch(e => setImmediate(() => { throw e }))
});

module.exports = router;
