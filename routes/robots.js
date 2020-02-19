var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET robots listing. */
router.get('/', function(req, res, next) {
  models.Robot.findAll().then((robots) => {
    res.json(robots);
  })

});

module.exports = router;
