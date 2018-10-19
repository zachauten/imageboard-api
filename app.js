const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const boards = require('./routes/boardRouter')
const threads = require('./routes/threadRouter')

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/v1/boards', boards)
app.use('/v1/threads', threads)

// catch all for all non-routes, put after all other "app.use"s
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

module.exports = app
