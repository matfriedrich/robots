var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET robots listing. */
router.get('/', function (req, res, next) {
    models.Robot.findAll().then((robots) => {
        res.json(robots);
    })

});

router.get('/:robotId', function (req, res, next) {
    models.Robot.findAll({where: {id: req.params['robotId']}}).then((robots) => {
        if (robots.length === 0) {
            res.status(404).json({error: "No robot found for this id."});
        } else {
            res.status(200).json(robots);
        }
    })

});

module.exports = router;
