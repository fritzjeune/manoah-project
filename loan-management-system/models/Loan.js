// models/Loans.js
const {
    DataTypes
} = require('sequelize');
const { Borrower } = require('../config/sequelize')

module.exports = (sequelize) => {
    const Loan = sequelize.define('loan', {
        loan_id: {
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
        amount_requested: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        interest_rate: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        mortgage_length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        approval_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_interest: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        total_loan: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        payment_end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        loan_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'loan_status',
                key: 'id',
            },
            default: 1
        }
    });

    // Loan.associate = (models) => {
    //     Loan.belongsTo(models.Borrower, {
    //         foreignKey: 'borrower_id',
    //         onDelete: 'CASCADE',
    //     });
    //     Loan.hasMany(models.Pledge, {
    //         foreignKey: 'loan_id',
    //         onDelete: 'CASCADE',
    //     });
    // };

    return Loan;
};