const db = require('../data/database')

module.exports.getAllBoards = async () => {
    let { rows } = await db.query('select * from boards;')
    return JSON.stringify(rows)
}

module.exports.getOneBoard = async board => {
    let { rows } = await db.query('select * from threads where board = $1;', [
        board
    ])
    return JSON.stringify(rows)
}

module.exports.createBoard = async name => {
    await db.query('insert into boards values($1);', [name])
}

module.exports.getPage = async (board, pageSize, offset) => {
    let { rows } = await db.query(
        'select * from threads where board = $1 order by id limit $2 offset $3',
        [board, pageSize, offset]
    )
    return JSON.stringify(rows)
}
