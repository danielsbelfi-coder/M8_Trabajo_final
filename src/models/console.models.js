const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Console = sequelize.define('Console', {
    fabricante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
        generacion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
})

module.exports = Console
