var express = require('express');
var router = express.Router();
var Danceoff = require("../models").Danceoff;
var Robot = require("../models").Robot;
var Team = require("../models").Team;

/* GET danceoffs listing. */
router.get('/', function (req, res, next) {
    Danceoff.findAll(
        {
            nest: false,
            raw: true,
            attributes: ['id'],
            include: [
                {
                    model: Robot, as: 'winner', attributes: ['name', 'id'], include:
                        {model: Team, attributes: ['name', 'id']}
                },
                {
                    model: Robot, as: 'contestant_one', attributes: ['name']
                },
                {
                    model: Robot, as: 'contestant_two', attributes: ['name']
                }
            ]
            , order: [
                [{model: Robot, as: 'winner'}, {model: Team}, 'id', 'desc']
            ]
        })

        .then((danceoffs) => {
            res.json(danceoffs);
        })
});


module.exports = router;
