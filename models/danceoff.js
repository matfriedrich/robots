'use strict';

module.exports = (sequelize, DataTypes) => {
    var Danceoff = sequelize.define('Danceoff', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        contestantOneId: {type: DataTypes.INTEGER, allowNull: false},
        contestantTwoId: {type: DataTypes.INTEGER, allowNull: false},
        winnerId: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        sequelize,
        validate: {
            sameTeam(next) {
                var Robot = require("../models").Robot;
                var contestantOne;
                var contestantTwo;
                return Robot.findOne({where: {id: this.contestantOneId}})
                    .then(result => {
                        contestantOne = result;
                        Robot.findOne({where: {id: this.contestantTwoId}}).then(result => {
                            contestantTwo = result;
                            console.log("cont1: " + contestantOne.id);
                            console.log("cont2: " + contestantTwo.id);
                            if (contestantOne.TeamId === contestantTwo.TeamId) {
                                next('Contestants can not be of the same team.');
                            }
                            next();
                        });
                    });
            }
        }
    });

    Danceoff.associate = function (models) {
        models.Danceoff.belongsTo(models.Robot, {as: "contestantOne", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "contestantTwo", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "winner", allowNull: false});
    };

    return Danceoff;
};
