const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Cliente = require("./Cliente");
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
  MetodoDePagamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  StatusDePagamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  StatusDeConsulta: {
    type: DataTypes.ENUM("Cancelada", "Pendente", "Remarcada", "Realizada"),
    allowNull: false,
  },
}, 
{
  timestamps: false, // Desabilita os campos createdAt e updatedAt
});

Agendamento.belongsTo(Cliente, { foreignKey: "idCliente" });
Agendamento.belongsTo(Servico, { foreignKey: "idServico" });

module.exports = Agendamento;
