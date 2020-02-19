'use strict';

module.exports = (sequelize, DataTypes) => {
    var Robot = sequelize.define('Robot', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        powermove: DataTypes.STRING,
        experience: DataTypes.INTEGER,
        outOfOrder: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        avatar: {type: DataTypes.STRING(1024), validate: {isUrl: true}}
    });


    Robot.associate = function (models) {
        models.Robot.belongsTo(models.Team, {
            onDelete: "CASCADE",
            foreignKey: {allowNull: false}
        });
    };

    return Robot;
};