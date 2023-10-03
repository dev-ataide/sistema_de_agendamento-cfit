// models/Agendamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Agendamento = sequelize.define('Agendamento', {
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoServico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colaborador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true, // Pode ser nulo se não houver observação
  },
  pacote: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Valor padrão é falso (não é um pacote)
  },
  metodoPagamento: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false, // Valor padrão é falso (não é um pacote)
  },

  // Outros campos do seu modelo aqui
});

Agendamento.sync()

module.exports = Agendamento;
