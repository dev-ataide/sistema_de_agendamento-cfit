const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const Colaborador = require("../Colaborador");
const Servico = require("../Servico");

const colaboradorServico = sequelize.define("colaboradorServico", {
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
  status : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
  }
});

// Relacionamentos
colaboradorServico.belongsTo(Servico, { foreignKey: "servicoId" }); 
colaboradorServico.belongsTo(Colaborador, { foreignKey: "colaboradorId" }); 

// Sincronização com o banco de dados
colaboradorServico.sync();
module.exports = colaboradorServico;
