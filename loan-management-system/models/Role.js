// models/Addresses.js
const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define('role', {
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
        timestamps: false
    });

    // Role.sync({ alter: true }).then((result) => {
    //     // return Role.create({
    //     //         name: "admin"
    //     //     })
    //     console.log("synced")
    // }).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log('Error syncing model with table')
    // });

    return Role;
};