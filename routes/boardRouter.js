const router = require('express').Router()
const boardController = require('../controllers/boardController')
const asyncMiddleWare = require('../asyncMiddleware')

router.get('/', asyncMiddleWare(boardController.getAllBoards))
router.post('/', asyncMiddleWare(boardController.createBoard))
router.get('/:board', asyncMiddleWare(boardController.getOneBoard))
router.get('/:board/:page(\\d+)', asyncMiddleWare(boardController.getPage))

module.exports = router
