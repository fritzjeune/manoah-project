// models/Borrower.js
const {
    DataTypes
} = require('sequelize');


module.exports = (sequelize) => {
    const Borrower = sequelize.define('borrower', {
        borrower_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nif: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ninu: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        city_of_birth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_of_birth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_of_birth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        case_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
            },
        },
    });

    // Borrower.associate = (models) => {
    //     Borrower.hasMany(models.Contact, {
    //         foreignKey: 'borrower_id',
    //         onDelete: 'CASCADE'
    //     });
    //     Borrower.hasOne(models.Address, {
    //         foreignKey: 'borrower_id',
    //         onDelete: 'CASCADE'
    //     });
    //     Borrower.hasMany(models.ReferencePerson, {
    //         foreignKey: 'borrower_id',
    //         onDelete: 'CASCADE'
    //     });
    //     Borrower.hasMany(models.Loan, {
    //         foreignKey: 'borrower_id',
    //         onDelete: 'CASCADE'
    //     });
    // }

    return Borrower;
};