// models/Addresses.js
const {
    DataTypes
} = require('sequelize');
const { Borrower } = require('../config/sequelize')

module.exports = (sequelize) => {
    const Address = sequelize.define('address', {
        address_id: {
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
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_property_owner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    Address.associate = (models) => {
        Address.belongsTo(models.Borrower, {
            foreignKey: 'borrower_id'
        });
    }
    return Address;
};