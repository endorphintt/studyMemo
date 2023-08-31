const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        imagePath: {
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