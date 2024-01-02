// models/Addresses.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const LoanStatus = sequelize.define('loan_status', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        freezeTableName: true,
    });

    // LoanStatus.sync({ alter: true }).then((result) => {
    //     // return LoanStatus.create({
    //     //         name: "inactive"
    //     //     })
    // }).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log('Error syncing model with table')
    // });

    return LoanStatus;
};