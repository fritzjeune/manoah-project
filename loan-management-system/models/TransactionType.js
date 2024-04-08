// models/Addresses.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const TransactionType = sequelize.define('transaction_type', {
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

    return TransactionType;
};