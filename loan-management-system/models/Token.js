// models/Token.js

const {
    DataTypes
} = require('sequelize');
const {
    User
} = require('../config/sequelize');

module.exports = (sequelize) => {
    const Token = sequelize.define('token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
            },
        },
    }, {
        freezeTableName: true,
    });

    // Define associations
    Token.associate = (models) => {
        Token.belongsTo(models.User);
        User.hasMany(models.Token);
    };

    

    return Token;
};