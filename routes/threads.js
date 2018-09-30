const router = require('express').Router();
const db = require('../database');
const asyncMiddleware = require('../asyncMiddleware');

router.post('/', asyncMiddleware(async (req, res) => {
    const { title, board } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('New thread must have title.');
    }
    await db.query('insert into threads(title, board) values($1, $2);', [title, board]);
    res.status(201).send();
}));

// TODO: change to get all posts from a thread?
// TODO: Use regex on route to only take int
router.get('/:thread', asyncMiddleware(async (req, res) => {
    const { thread } = req.params;
    const { rows } = await db.query('select * from threads where id = $1;', [thread]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
}));

// TODO: regex (\d+)
router.post('/:thread', asyncMiddleware(async (req, res) => {
    const { name, commentary } = req.body;
    const thread = req.params.thread;
    await db.query('insert into posts(name, commentary, thread) values($1, $2, $3);', [name, commentary, thread]);
    res.status(201).send();
}));

module.exports = router;