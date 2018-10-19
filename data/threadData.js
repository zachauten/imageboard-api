const db = require('./database')

module.exports.getOneThread = async thread => {
    let { rows } = await db.query('select * from posts where thread = $1;', [
        thread
    ])
    return JSON.stringify(rows)
}

module.exports.createThread = async (title, board) => {
    await db.query('insert into threads(title, board) values($1, $2);', [
        title,
        board
    ])
}

module.exports.createPost = async (name, commentary, thread) => {
    await db.query(
        'insert into posts(name, commentary, thread) values($1, $2, $3);',
        [name, commentary, thread]
    )
}
