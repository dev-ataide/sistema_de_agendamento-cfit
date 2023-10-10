const { DataTypes } = require("sequelize");
const conexaodb = require("../database/db");
const Servico = require("./Servico");
const UnidadeEmpresa = require("./UnidadeEmpresa");
const Unidade = require("./Unidade");

const Horario = conexaodb.define("Horario", {
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
      key: 'id',
    },
  },
  servicoId: { // Correção aqui: deve ser 'servicoId'
    type: DataTypes.INTEGER, // Correção aqui: você estava usando STRING, mas deveria ser INTEGER
    allowNull: false,
    references: {
      model: Servico,
      key: 'id', // Correção aqui: deve ser 'id', não 'idServico'
    },
  },
  dias: {
    type: DataTypes.STRING, // Correção aqui
    allowNull: false,
  }
});

// Relacionamentos
Horario.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" });
Horario.belongsTo(Servico, { foreignKey: "servicoId" }); // Correção aqui: deve ser 'servicoId'
Horario.belongsTo(Unidade);

module.exports = Horario;
