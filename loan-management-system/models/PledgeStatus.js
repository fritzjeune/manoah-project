// models/pledgeStatus.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PledgeStatus = sequelize.define('pledge_status', {
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

    return PledgeStatus;
};
