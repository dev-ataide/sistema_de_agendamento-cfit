const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const Unidade = require("../Unidade");
const Clientes = require("../Clientes");

const unidadeCliente = sequelize.define("unidadeCliente", {
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
      key: 'id', // O campo de referência na tabela de Unidade
    },
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Clientes,
      key: 'id', // O campo de referência na tabela cliente
    },
  },
  status : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
  }
});

// Relacionamentos
unidadeCliente.belongsTo(Unidade, { foreignKey: "unidadeId" }); 
unidadeCliente.belongsTo(Clientes, { foreignKey: "clienteId" }); 

// Sincronização com o banco de dados
unidadeCliente.sync();
module.exports = unidadeCliente;
