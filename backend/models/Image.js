const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Image extends Model {}

Image.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Image',
        tableName: 'images',
    }
);

module.exports = Image;