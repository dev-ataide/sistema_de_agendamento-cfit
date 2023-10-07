// Agendamento.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Cliente = require("./Cliente"); // Importe o modelo Cliente aqui
const UnidadeEmpresa = require("./UnidadeEmpresa");
const Servico = require("./Servico");

const Agendamento = sequelize.define("Agendamento", {
  dataHoraAgendamento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  disponibilidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statusAgendamento: {
    type: DataTypes.ENUM("Confirmado", "Pendente", "Cancelado"),
    allowNull: false,
  },
});

// Sincronização com o banco de dados
Agendamento.sync();

// Relacionamentos
Agendamento.belongsTo(Cliente, { foreignKey: "idCliente" }); // Um agendamento pertence a um cliente
Agendamento.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um agendamento pertence a uma unidade de empresa
Agendamento.belongsTo(Servico, { foreignKey: "idServico" }); // Um agendamento pertence a um serviço

module.exports = Agendamento;
