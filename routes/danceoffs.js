var express = require('express');
var router = express.Router();
var Danceoff = require("../models").Danceoff;
var Robot = require("../models").Robot;
var Team = require("../models").Team;

/*
*  GET danceoffs listing
* */
router.get('/', function (req, res) {
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
                    model: Robot, as: 'contestantOne', attributes: ['name']
                },
                {
                    model: Robot, as: 'contestantTwo', attributes: ['name']
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


/*
* insert new danceoff result
* */
router.put('/', function (req, res) {
    Danceoff.create(req.body)
        .then(danceoff => {
            res.json(danceoff);
        })
        .catch(err => {
            console.log(err);
            res.json({error: err});
        });
});


module.exports = router;
