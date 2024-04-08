// models/pledge.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pledge = sequelize.define('pledge', {
        pledge_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pledge_value: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('pledge_value')) || 0;
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pledge_text: {
            type: DataTypes.TEXT,
        },
        loan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
        },
        pledge_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Pledge.associate = (models) => {
        Pledge.belongsTo(models.Loan, {
            foreignKey: 'loan_id',
            onDelete: 'CASCADE',
        });
        Pledge.belongsTo(models.PledgeStatus, {
            foreignKey: 'pledge_status_id',
        });
    };

    return Pledge;
};
