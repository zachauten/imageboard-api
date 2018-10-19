const threadData = require('../data/threadData');

module.exports.getOneThread = async (req, res) => {
    const { thread } = req.params;
    try {
        let json = await threadData.getOneThread(thread);
        res.status(200).send(json);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

module.exports.createThread = async (req, res) => {
    const { title, board } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('New thread must have title.');
    }
    try {
        await threadData.createThread(title, board);
        res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

module.exports.createPost = async (req, res) => {
    const { name, commentary } = req.body;
    const { thread } = req.params;
    try {
        await threadData.createPost(name, commentary, thread);
        res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};
