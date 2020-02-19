/*
* create dummy data for developing
* */
var Robot = require("../models").Robot;

module.exports = function createDummyData() {
    // only create new dummy data if database is empty
     Robot.count().then((count) => {
         if(count == 0) {
             _createDummyData();
         }
     });
};


function _createDummyData() {
    console.info("creating dummy data.");
    Robot.bulkCreate(dummyRobots);
}

var dummyRobots = [
    {name: "Jumbotron"},
    {name: "Flexomatic"},
    {name: "Crushinator"},
    {name: "Bender"}
]