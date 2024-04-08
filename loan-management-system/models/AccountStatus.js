// models/Addresses.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const AccountStatus = sequelize.define('account_status', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return AccountStatus;
};