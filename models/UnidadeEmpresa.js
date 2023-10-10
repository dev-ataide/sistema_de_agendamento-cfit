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

// Sincronização com o banco de dados
UnidadeEmpresa.sync()
  .then(() => {
    console.log("Tabela 'UnidadeEmpresa' sincronizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a sincronização da tabela 'UnidadeEmpresa':", error);
  });

module.exports = UnidadeEmpresa;
