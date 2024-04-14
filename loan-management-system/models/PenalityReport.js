// models/PenalityReportes.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const PenalityReport = sequelize.define('penality_report', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total_charged: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get() {
                return parseInt(this.getDataValue('total_charged')) || 0;
            }
        },
        today_fee_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('today_fee_amount')) || 0;
            }
        },
        total_penalities: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('total_penalities')) || 0;
            }
        }
    });

    return PenalityReport;
};