const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../infra/db');

class BookModel extends Model {}

BookModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfpages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'BookModel',
});

module.exports = {BookModel};
