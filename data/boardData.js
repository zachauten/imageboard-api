const db = require('./database');

module.exports.getAllBoards = async () => {
    try {
        let { rows } = await db.query('select * from boards;');
        return JSON.stringify(rows);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getOneBoard = async (board) => {
    try {
        let { rows } = await db.query('select * from threads where board = $1;', [board]);
        return JSON.stringify(rows);
    } catch (error) {
        console.log(error);
    }
};

module.exports.createBoard = async (name) => {
    try {
        await db.query('insert into boards values($1);', [name]);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getPage = async (board, pageSize, offset) => {
    try {
        let { rows } = await db.query('select * from threads where board = $1 order by id limit $2 offset $3', [board, pageSize, offset]);
        return JSON.stringify(rows);
    } catch (error) {
        console.log(error);
    }
};
