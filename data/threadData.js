const db = require('./database')

module.exports.getOneThread = async thread => {
    try {
        let { rows } = await db.query(
            'select * from posts where thread = $1;',
            [thread]
        )
        return JSON.stringify(rows)
    } catch (error) {
        console.log(error)
    }
}

module.exports.createThread = async (title, board) => {
    try {
        await db.query('insert into threads(title, board) values($1, $2);', [
            title,
            board
        ])
    } catch (error) {
        console.log(error)
    }
}

module.exports.createPost = async (name, commentary, thread) => {
    try {
        await db.query(
            'insert into posts(name, commentary, thread) values($1, $2, $3);',
            [name, commentary, thread]
        )
    } catch (error) {
        console.log(error)
    }
}
