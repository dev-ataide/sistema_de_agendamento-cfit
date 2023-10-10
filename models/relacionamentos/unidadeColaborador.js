const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const Unidade = require("../Unidade");
const Colaborador = require("../Colaborador");

const unidadeColaborador = sequelize.define("unidadeColaborador", {
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
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
unidadeColaborador.belongsTo(Unidade, { foreignKey: "unidadeId" }); 
unidadeColaborador.belongsTo(Colaborador, { foreignKey: "colaboradorId" }); 

// Sincronização com o banco de dados
module.exports = unidadeColaborador;