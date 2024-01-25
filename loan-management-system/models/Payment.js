// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('payment', {
        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        loan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'loan',
                key: 'loan_id',
            },
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        capital: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        interest: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        penalities: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        payment_method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'payment_method',
                key: 'id',
            },
        },
        month_reference: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Loan, {
            foreignKey: 'loan_id'
        });
    };

    return Payment;
};
