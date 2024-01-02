// models/User.js
const {
    DataTypes, Model
} = require('sequelize');
const { Role } = require('../config/sequelize')

module.exports = (sequelize) => {

    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
                key: 'id',
            },
        },
    }, {
        freezeTableName: true
    });
    
    // Define associations
    User.associate = (models) => {
        User.hasMany(models.Borrower, {
            foreignKey: 'created_by',
            onDelete: 'CASCADE',
        });
    };

    // User.sync({ alter: true }).then((result) => {
    //     console.log('Table and model synced')
    // }).catch((err) => {
    //     console.log('Error syncing model with table')
    // });

    return User;
};