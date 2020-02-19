var express = require('express');
var router = express.Router();
var Danceoff = require("../models").Danceoff;

/* GET danceoffs listing. */
router.get('/', function (req, res, next) {
    Danceoff.findAll().then((danceoffs) => {
        res.json(danceoffs);
    })
});


module.exports = router;
