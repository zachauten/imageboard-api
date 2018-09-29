const router = require('express').Router();
const db = require('../database');

// create a thread
router.post('/', async (req, res) => {
    const { title, board } = req.body;
    if (!title) {
        const error = new Error('New thread must have title.');
        error.httpStatusCode = 400;
        return next(error);
    }
    await db.query('insert into threads(title, board) values($1, $2);', [title, board]);
    res.status(201).send();
});

// TODO: change to get all posts from a thread?
// TODO: add back regex to match endpoint to only integers.
// get a specific thread
router.get('/:thread', async (req, res) => {
    const { thread } = req.params;
    const { rows } = await db.query('select * from threads where id = $1;', [thread]);
    var json = JSON.stringify(rows);
    res.status(200).send(json);
})

// create a post in a thread
router.post('/:thread(\d+)', async (req, res) => {
    const { name, commentary } = req.body;
    const thread = req.params.thread;
    await db.query('insert into posts(name, commentary, thread) values($1, $2, $3);', [name, commentary, thread]);
    res.status(201).send();
});

module.exports = router;