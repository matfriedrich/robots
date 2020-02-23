'use strict';

module.exports = (sequelize, DataTypes) => {
    var Danceoff = sequelize.define('Danceoff', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        contestantOneId: {type: DataTypes.INTEGER, allowNull: false},
        contestantTwoId: {type: DataTypes.INTEGER, allowNull: false},
        winnerId: {type: DataTypes.INTEGER, allowNull: false}
    });


    Danceoff.associate = function (models) {
        models.Danceoff.belongsTo(models.Robot, {as: "contestantOne", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "contestantTwo", allowNull: false});
        models.Danceoff.belongsTo(models.Robot, {as: "winner", allowNull: false});
    };

    return Danceoff;
};
