const router = require('express').Router();
const db = require('../database');
const asyncMiddleware = require('../asyncMiddleware');

router.get('/', asyncMiddleware( async (req, res) => {
    const { rows } =  await db.query('select * from boards;');
    var json = JSON.stringify(rows);
    res.status(200).send(json);
}));

router.post('/', asyncMiddleware( async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Missing board name.');
    }
    await db.query('insert into boards values($1);', [name]);
    res.status(201).send();
}));

// Get threads on a board
router.get('/:board', asyncMiddleware( async (req, res) => {
    const { board } = req.params;
    const { rows } = await db.query('select * from threads where board = $1;', [board]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
}));

//TODO: implement pagination
// get the threads on a page of a board
router.get('/boards/:board/:page(\d+)', asyncMiddleware( async (req, res, next) => {
    const {board} = req.params;
    const { rows } = await db.query('select * from boards where name = $1;', [board]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
}));

module.exports = router;
