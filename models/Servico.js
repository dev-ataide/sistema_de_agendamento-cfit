// Servico.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Unidade = require("./Unidade");


const Servico = sequelize.define("Servico", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
      key: 'id', // O campo de referência na tabela de Unidade
      require: true,
    },
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});


Servico.belongsTo(Unidade, { foreignKey: 'unidadeId' });
Servico.sync();

module.exports = Servico;
