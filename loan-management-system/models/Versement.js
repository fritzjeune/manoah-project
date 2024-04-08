// models/Payments.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Versement = sequelize.define('versement', {
        versement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // loan_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'loan',
        //         key: 'loan_id',
        //     },
        // },
        versement_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        versement_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        capital: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        balance_capital: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        balance_interest: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        grand_total: {
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
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'versement_status',
                key: 'id',
            },
        },
        versement_metadata_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'versement_metadata',
                key: 'id',
            },
        }
    });

    // Versement.associate = (models) => {
    //     Versement.belongsTo(models.Loan, {
    //         foreignKey: 'loan_id'
    //     });
    //     Versement.belongsTo(models.VersementMetadata, {
    //         foreignKey: 'versement_metadata_id'
    //     });
    // };

    return Versement;
};
