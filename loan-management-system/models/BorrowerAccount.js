// models/pledgeStatus.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BorrowerAccount = sequelize.define('borrower_account', {
        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        borrower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'borrower',
                key: 'borrower_id',
            },
        },
        balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            default: 0,
            get() {
                return parseFloat(this.getDataValue('balance')) || 0;
            }
        },
        minimum_balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            default: 500,
            get() {
                return parseFloat(this.getDataValue('minimum_balance')) || 0;
            }
        },
        devise: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return BorrowerAccount;
};