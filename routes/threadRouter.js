const router = require('express').Router()
const threadController = require('../controllers/threadController')
const asyncMiddleWare = require('../asyncMiddleware')

router.get('/:thread(\\d+)', asyncMiddleWare(threadController.getOneThread))
router.post('/', asyncMiddleWare(threadController.createThread))
router.post('/:thread(\\d+)', asyncMiddleWare(threadController.createPost))

module.exports = router
