// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AccountTransaction = sequelize.define('account_transaction', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        borrower_account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'borrower_account',
                key: 'account_id',
            },
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('amount')) || 0;
            }
        },
        transaction_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transaction_type',
                key: 'id',
            },
        },
        balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('amount')) || 0;
            }
        },
        memo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return AccountTransaction;
};
