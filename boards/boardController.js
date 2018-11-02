const boardData = require('./boardData')

module.exports.getAllBoards = async (req, res) => {
    let json = await boardData.getAllBoards()
    res.status(200)
    res.send(json)
}

module.exports.getOneBoard = async (req, res) => {
    const { board } = req.params
    let json = await boardData.getOneBoard(board)
    res.status(200).send(json)
}

module.exports.createBoard = async (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400)
        throw new Error('Missing board name.')
    }
    await boardData.createBoard(name)
    res.status(201).send()
}

module.exports.getPage = async (req, res) => {
    const { board } = req.params
    const page = parseInt(req.params.page)
    const pageSize = 5
    const offset = pageSize * (page - 1)
    if (page < 1) {
        res.status(400)
        throw new Error('Page must be an integer greater than 0.')
    }
    let json = await boardData.getPage(board, pageSize, offset)
    res.status(200).send(json)
}
