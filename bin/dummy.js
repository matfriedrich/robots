/*
* create dummy data for developing
* */
var Robot = require("../models").Robot;
var Team = require("../models").Team;
var Danceoff = require("../models").Danceoff;

module.exports = function createDummyData() {
    // only create new dummy data if database is empty
    Robot.count().then((count) => {
        if (count === 0) {
            _createDummyData();
        }
    });
};


function _createDummyData() {
    console.info("creating dummy data.");
    Team.bulkCreate(dummyTeams);
    Robot.bulkCreate(dummyRobots).then(() => {
        Danceoff.bulkCreate(dummyDanceoffs);
    });
}

var dummyTeams = [
    {id: 1, name: "The Gracefull Grapes"},
    {id: 2, name: "The Agile Apples"}
];

var dummyRobots = [
    {id: 1, name: "Jumbotron", TeamId: 2},
    {id: 2, name: "Flexomatic", TeamId: 2},
    {id: 3, name: "Crushinator", TeamId: 2},
    {id: 4, name: "Bender", TeamId: 2},
    {id: 5, name: "Roberto", TeamId: 2},
    {id: 6, name: "Arnold", TeamId: 1},
    {id: 7, name: "Hal", TeamId: 1},
    {id: 8, name: "Wadsworth", TeamId: 1},
    {id: 9, name: "Wall-e", TeamId: 1},
    {id: 10, name: "Serenity", TeamId: 1},
];

var dummyDanceoffs = [
    {contestantOneId: 1, contestantTwoId: 6, winnerId: 1},
    {contestantOneId: 2, contestantTwoId: 7, winnerId: 7},
];
