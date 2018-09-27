var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/imageboard';

//
router.get('/boards/:boardName/threads', function(req, res, next) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from threads where board = \'' + req.params.boardName + '\';', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        var json = JSON.stringify(result.rows);
        res.status(200);
        res.send(json);
    });

});

router.get('/boards/:boardName/threads/:threadId(\d+)', function(req, res, next) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from threads where id = \'' + req.params.threadId + '\';', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        var json = JSON.stringify(result.rows);
        res.status(200);
        res.send(json);
    });
});

router.post('/boards/:boardName/threads', function (req, res, next) {
    const title = req.body.title;
    if (!title) {
        const error = new Error('New thread must have title.');
        error.httpStatusCode = 400;
        return next(error);
    }
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('insert into threads(title, board) values(' + title + ', ' + req.params.boardName + ');', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        } 
        res.status(201);
        res.send();
    });
});

router.post('/boards/:boardName/threads/:threadId(\d+)', function (req, res, next) {
    const title = req.body.title;
    if (!title) {
        const error = new Error('New thread must have title.');
        error.httpStatusCode = 400;
        return next(error);
    }
});

module.exports = router;