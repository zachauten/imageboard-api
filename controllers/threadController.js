const threadData = require('../data/threadData');

//TODO: Get all posts from one thread
module.exports.getOneThread = async (req, res) => {
    // const { thread } = req.params;
    // let json = await threadData.getOneThread(thread);
    // res.status(200).send(json);
};

module.exports.createThread = async (req, res) => {
    const { title, board } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('New thread must have title.');
    }
    await threadData.createThread(title, board);
    res.status(201).send();
};

module.exports.createPost = async (req, res) => {
    const { name, commentary } = req.body;
    const { thread } = req.params;
    await threadData.createPost(name, commentary, thread);
    res.status(201).send();
};
