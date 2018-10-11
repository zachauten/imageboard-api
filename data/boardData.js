const db = require('./database');

module.exports.getAllBoards = async () => {
    let { rows } = await db.query('select * from boards;');
    return JSON.stringify(rows);
};

module.exports.getOneBoard = async (board) => {
    let { rows } = await db.query('select * from threads where board = $1;', [board]);
    return JSON.stringify(rows);
};

//TODO: how do we know if there's an error inserting? 
module.exports.createBoard = (name) => {
    db.query('insert into boards values($1);', [name]);
};

module.exports.getPage = (board, page) => {
    //TODO: 
};
 
