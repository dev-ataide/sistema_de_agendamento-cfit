const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Servico = sequelize.define("Servico", {
  nomeServico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duracao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
},
{
  timestamps: false, // Desabilita os campos createdAt e updatedAt
});


module.exports = Servico;
