// Horario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Servico = require("./Servico");

const Horario = sequelize.define("Horario", {
    unidadeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Unidade,
          key: 'id', // O campo de referência na tabela de Unidade
          require: true,
        },
      },    
    servico: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Servico,
          key: 'id', // O campo de referência na tabela de Unidade
          require: true,
        },
      },
      dias:{
        type :[Number],
        require:true,
      },
      inicio :{

      }
});

// Sincronização com o banco de dados

// // Relacionamentos
// Horario.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um serviço gerenciado pertence a uma unidade de empresa
// Horario.belongsTo(Servico, { foreignKey: "idServico" }); // Um serviço gerenciado pertence a um serviço
Horario.sync();

module.exports = Horario;
