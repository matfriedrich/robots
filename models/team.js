'use strict';

module.exports = (sequelize, DataTypes) => {
    var Team = sequelize.define('Team', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        name: DataTypes.STRING
    });

    Team.associate = function (models) {
        models.Team.hasMany(models.Robot);
    };

    return Team;
};