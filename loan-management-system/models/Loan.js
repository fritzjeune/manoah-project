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
            get() {
                return parseFloat(this.getDataValue('amount_requested')) || 0;
            }
        },
        amount_approuved: {
            type: DataTypes.DECIMAL(15, 2),
            get() {
                return parseFloat(this.getDataValue('amount_approuved')) || 0;
            }
        },
        payment_frequence_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'loan_payment_frequence',
                key: 'id',
            },
            default: 2
        },
        interest_method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'interest_method',
                key: 'id',
            },
            default: 2
        },
        disbursement_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'disbursement',
                key: 'disbursement_id',
            },
        },
        interest_rate: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('interest_rate')) || 0;
            }
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
            allowNull: true,
        },
        requested_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_interest: {
            type: DataTypes.DECIMAL(15, 2),
            get() {
                return parseFloat(this.getDataValue('total_interest')) || 0;
            }
        },
        total_loan: {
            type: DataTypes.DECIMAL(15, 2),
            get() {
                return parseFloat(this.getDataValue('total_loan')) || 0;
            }
        },
        payment_end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        memo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        loan_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // loan_status: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'loan_status',
        //         key: 'id',
        //     },
        //     default: 1
        // }
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