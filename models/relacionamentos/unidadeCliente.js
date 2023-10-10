const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const Unidade = require("../Unidade");
const Cliente = require("../Cliente");

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
      model: Cliente, // Correção aqui: use Cliente em vez de Clientes
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
unidadeCliente.belongsTo(Cliente, { foreignKey: "clienteId" }); 

// Sincronização com o banco de dados
module.exports = unidadeCliente;
