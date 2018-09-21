var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function (req, res, next) {
    res.send('index');
});

// TODO: Error handling
router.get('/:boardName', function (req, res, next) {
    var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/imageboard';
    var client = new pg.Client(connectionString);
    client.connect();
    client.query('select * from boards;', function(err, result) {
        var json = JSON.stringify(result.rows);
        res.send(json);
    });
});

module.exports = router;
