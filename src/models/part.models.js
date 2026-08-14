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
        }
})

module.exports = Part