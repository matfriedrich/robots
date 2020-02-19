/*
* create dummy data for developing
* */
var Robot = require("../models").Robot;
var Team = require("../models").Team;

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
    Team.bulkCreate(dummyTeams).then(() => {
        Robot.bulkCreate(dummyRobots);
    });
}

var dummyTeams = [
    {id: 1, name: "The Gracefull Grapes"},
    {id: 2, name: "The Agile Apples"}
];

var dummyRobots = [
    {name: "Jumbotron", TeamId: 2},
    {name: "Flexomatic", TeamId: 2},
    {name: "Crushinator", TeamId: 2},
    {name: "Bender", TeamId: 1}
];