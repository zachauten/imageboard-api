var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/imageboard';

// get a list of all boards
router.get('/boards', function(req, res, next) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from boards;', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        var json = JSON.stringify(result.rows);
        res.status(200);
        res.send(json);
        client.end();
    });
});

// create a new board
router.post('/boards', function (req, res, next) {
    const boardName = req.body.name;
    if (!boardName) {
        const error = new Error('Missing board name.');
        error.httpStatusCode = 400;
        return next(error);
    }
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('insert into boards values(\'' + req.body.name + '\');', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        res.status(201);
        res.send();
        client.end();
    });
});

// get a board by name
router.get('/boards/:boardName', function (req, res, next) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from boards where name = \'' + req.params.boardName + '\';', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        var json = JSON.stringify(result.rows);
        res.status(200);
        res.send(json);
        client.end();
    });
});

// get the threads on a page of a board
router.get('/boards/:boardName/:page(\d+)', function (req, res, next) {
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from boards where name = \'' + req.params.boardName + '\';', function(err, result) {
        if (err) {
            err.httpStatusCode = 500;
            return next(err);
        }
        var json = JSON.stringify(result.rows);
        res.status(200);
        res.send(json);
        client.end();
    });
});

module.exports = router;
