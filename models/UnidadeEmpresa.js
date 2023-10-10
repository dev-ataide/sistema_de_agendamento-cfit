// UnidadeEmpresa.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Servico = require("./Servico");

const UnidadeEmpresa = sequelize.define("UnidadeEmpresa", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  informacoesContato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports = UnidadeEmpresa;
