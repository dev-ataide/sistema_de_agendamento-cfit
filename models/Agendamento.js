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
<<<<<<< HEAD
Agendamento.sync()
  .then(() => {
    console.log("Tabela 'Agendamento' sincronizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a sincronização da tabela 'Agendamento':", error);
  });

Agendamento.belongsTo(Cliente, { foreignKey: "idCliente" }); // Um agendamento pertence a um cliente
Agendamento.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um agendamento pertence a uma unidade de empresa
Agendamento.belongsTo(Servico, { foreignKey: "idServico" }); // Um agendamento pertence a um serviço

=======
console.log("funcionou")
Agendamento.sync();
>>>>>>> 7c00409cce9d8169e9495698d95a83c3d49b2ceb
module.exports = Agendamento;
