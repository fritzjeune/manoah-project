// models/ReferencePersons.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const ReferencePerson = sequelize.define('reference_person', {
        reference_id: {
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
        loan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'loan',
                key: 'loan_id',
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nif: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_to_borrower: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return ReferencePerson;
};