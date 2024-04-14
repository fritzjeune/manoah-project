// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Disbursement = sequelize.define('disbursement', {
        disbursement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        payment_method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'payment_method',
                key: 'id',
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
    }, );

    return Disbursement;
};
