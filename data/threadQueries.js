const db = require('../database');

module.exports.readThread = (thread) => {
    let rows = db.query('select * from threads where id = $1;', [thread]);
    return JSON.stringify(rows);
};

module.exports.createThread = (title, board) => {
    db.query('insert into threads(title, board) values($1, $2);', [title, board]);
};

module.exports.createPost = (name, commentary, thread) => {
    db.query('insert into posts(name, commentary, thread) values($1, $2, $3);', [name, commentary, thread]);
};