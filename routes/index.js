var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("creating dummy data!");
  res.send("itworks!");
});

module.exports = router;
