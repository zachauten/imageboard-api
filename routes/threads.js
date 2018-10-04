const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const threadQueries = require('../data/threadQueries');

// TODO: change to get all posts from a thread?
router.get('/:thread(\\d+)', asyncMiddleware(async (req, res) => {
    const { thread } = req.params;
    let json = await threadQueries.readThread(thread);
    res.status(200).send(json);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { title, board } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('New thread must have title.');
    }
    await threadQueries.createThread(title, board);
    res.status(201).send();
}));

router.post('/:thread(\\d+)', asyncMiddleware(async (req, res) => {
    const { name, commentary } = req.body;
    const { thread } = req.params;
    await threadQueries.createPost(name, commentary, thread);
    res.status(201).send();
}));

module.exports = router;
