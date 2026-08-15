const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js')
const bcrypt = require("bcryptjs")

const User = sequelize.define('User', {
    alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.beforeCreate(async (user) => {
    const hashedPass = await bcrypt.hash(user.password, 10)
    user.password = hashedPass
})

module.exports = User
