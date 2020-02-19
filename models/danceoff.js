'use strict';

module.exports = (sequelize, DataTypes) => {
    var Danceoff = sequelize.define('Danceoff', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    });


    Danceoff.associate = function (models) {
        models.Danceoff.belongsTo(models.Robot, {as: "contestant_one"});
        models.Danceoff.belongsTo(models.Robot, {as: "contestant_two"});
        models.Danceoff.belongsTo(models.Robot, {as: "winner"});
    };

    return Danceoff;
};