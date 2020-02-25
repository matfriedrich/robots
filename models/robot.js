'use strict';

module.exports = (sequelize, DataTypes) => {
    const Robot = sequelize.define('Robot', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        powermove: DataTypes.STRING,
        experience: {type: DataTypes.INTEGER, defaultValue: 0},
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
