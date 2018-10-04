const db = require('../database');

module.exports.readBoards = () => {
    let rows = db.query('select * from boards;');
    return JSON.stringify(rows);
};

module.exports.readBoard = (board) => {
    let rows = db.query('select * from threads where board = $1;', [board]);
    return JSON.stringify(rows);
};

module.exports.readPage = (board, page) => {
    //TODO: 
};

module.exports.createBoard = (name) => {
    db.query('insert into boards values($1);', [name]);
};
