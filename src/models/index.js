const sequelize = require('../config/database.js')
const User = require('./user.models')
const Part = require('./part.models')
const Console = require('./console.models');
const { Sequelize } = require('sequelize');

Console.hasMany(Part, {
  foreignKey: "consoleId",
  as: "repuestos",
});

Part.belongsTo(Console, {
  foreignKey: "consoleId",
  as: "plataforma",
});

module.exports = {
  sequelize,
  User,
  Console,
  Part,
};