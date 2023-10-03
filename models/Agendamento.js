// models/Agendamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Agendamento = sequelize.define('Agendamento', {
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Outros campos do seu modelo aqui
});

module.exports = Agendamento;
