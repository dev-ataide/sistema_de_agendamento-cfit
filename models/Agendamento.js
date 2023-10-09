const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Unidade = require("./Unidade");
const Clientes = require("./Clientes");
const Servico = require("./Servico");
const Colaborador = require("./Colaborador");

const Agendamento = sequelize.define("Agendamento", {
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Clientes,
      key: 'id', // O campo de referência na tabela cliente
    },
  },
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
      key: 'id', // O campo de referência na tabela de Unidade
    },
  },
  servicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Servico,
      key: 'id', // O campo de referência na tabela de Unidade
    },
  },
  colaboradorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Colaborador,
      key: 'id', // O campo de referência na tabela Colaborador
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    require: true,
  },
  preco: {
    type: DataTypes.FLOAT, // Corrigido para FLOAT
    allowNull: false,
    require: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Sincronização com o banco de dados
console.log("funcionou")
Agendamento.sync();
module.exports = Agendamento;
