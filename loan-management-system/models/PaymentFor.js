// models/pledgeStatus.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PaymentFor = sequelize.define('payment_for', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return PaymentFor;
};