const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Part = sequelize.define('Part', {
    nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        condicion: {
            type: DataTypes.STRING,
            allowNull: false,      
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contacto: {
            type: DataTypes.STRING(12),
            allowNull: false
        }
})

module.exports = Part