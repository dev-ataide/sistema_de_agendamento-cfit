// HistoricoCliente.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Cliente = require("./Cliente");
const Servico = require("./Servico");

const HistoricoCliente = sequelize.define("HistoricoCliente", {
  dataServico: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  statusServico: {
    type: DataTypes.ENUM("Concluído", "Pendente", "Cancelado"),
    allowNull: false,
  },
});

// Relacionamentos
HistoricoCliente.belongsTo(Cliente, { foreignKey: "idCliente" }); // Um histórico de cliente pertence a um cliente
HistoricoCliente.belongsTo(Servico, { foreignKey: "idServico" }); // Um histórico de cliente pertence a um serviço

// Sincronização com o banco de dados
HistoricoCliente.sync();

module.exports = HistoricoCliente;
