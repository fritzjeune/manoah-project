// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Deposit = sequelize.define('deposit', {
        deposit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        borrower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'borrower',
                key: 'borrower_id',
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
        memo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_for_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'payment_for',
                key: 'id',
            },
        },
        payment_method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'payment_method',
                key: 'id',
            },
        },
        versement_reference_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'versement_reference',
                key: 'id',
            },
        }
    });

    Deposit.associate = (models) => {
        Deposit.belongsTo(models.Borrower, {
            foreignKey: 'borrower_id'
        });
    };

    return Deposit;
};
