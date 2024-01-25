// models/InterestMethod.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const InterestMethod = sequelize.define('loan_payment_frequence', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    });

    return InterestMethod;
};