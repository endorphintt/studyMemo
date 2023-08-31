const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Event',
        tableName: 'Events'
    }
);

module.exports = Event;