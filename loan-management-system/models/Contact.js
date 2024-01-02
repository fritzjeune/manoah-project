// models/Contacts.js
const {
    DataTypes
} = require('sequelize');
const { Borrower } = require('../config/sequelize')

module.exports = (sequelize) => {
    const Contact = sequelize.define('contact', {
        contact_id: {
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
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });
    Contact.associate = (models) => {
        Contact.belongsTo(models.Borrower, {
            foreignKey: 'borrower_id'
        });
    }
    return Contact;
};