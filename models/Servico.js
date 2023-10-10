const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Unidade = require("./Unidade");


const Servico = sequelize.define("Servico", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unidade,
      key: 'id', // O campo de referência na tabela de Unidade
      require: true,
    },
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

<<<<<<< HEAD
Servico.sync()
  .then(() => {
    console.log("Tabela 'Servico' sincronizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a sincronização da tabela 'Servico':", error);
  });
=======

Servico.belongsTo(Unidade, { foreignKey: 'unidadeId' });
Servico.sync();
>>>>>>> 7c00409cce9d8169e9495698d95a83c3d49b2ceb

module.exports = Servico;
