// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const VersementMetadata = sequelize.define('versement_metadata', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        deposit_reference_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'account_transaction',
                key: 'transaction_id',
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
        versement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'versement',
                key: 'versement_id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue('amount')) || 0;
            }
        },
    });

    // Versement.associate = (models) => {
    //     Versement.belongsTo(models.Loan, {
    //         foreignKey: 'loan_id'
    //     });
    //     Versement.belongsTo(models.VersementMetadata, {
    //         foreignKey: 'versement_metadata_id'
    //     });
    // };

    return VersementMetadata;
};
