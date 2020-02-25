'use strict';

module.exports = (sequelize, DataTypes) => {
    const Danceoff = sequelize.define('Danceoff', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        contestantOneId: {type: DataTypes.INTEGER, allowNull: false},
        contestantTwoId: {type: DataTypes.INTEGER, allowNull: false},
        winnerId: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        sequelize,
        validate: {
            /*
            * multiple validators that all need contestant(Robot) data
            * aggregated in a single validator to reduce individual queries
            * */
            contestantCheck(next) {
                const Robot = require("../models").Robot;
                let contestantOne;
                let contestantTwo;
                Robot.findOne({where: {id: this.contestantOneId}})
                    .then(result => {
                        contestantOne = result;
                        Robot.findOne({where: {id: this.contestantTwoId}}).then(result => {
                            contestantTwo = result;

                            /*
                            * check whether the two opponents belong to the same team
                            * */
                            if (contestantOne.TeamId === contestantTwo.TeamId) {
                                next('Contestants can not be of the same team.');
                            }

                            /*
                            * check if either of the contestants is out of order
                            * */
                            if (contestantOne.outOfOrder || contestantTwo.outOfOrder) {
                                next("One or more contestants are out of order");
                            }
                            next();
                        });
                    });
            },
        }
    });

    Danceoff.associate = function (models) {
        models.Danceoff.belongsTo(models.Robot, {as: "contestantOne", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "contestantTwo", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "winner", allowNull: false});
    };

    return Danceoff;
};
