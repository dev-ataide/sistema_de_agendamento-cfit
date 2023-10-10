const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const UnidadeEmpresa = require("./UnidadeEmpresa");

const Gerente = sequelize.define("Gerente", {});

// Relacionamentos
Gerente.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um gerente pertence a uma unidade de empresa

Gerente.sync()
  .then(() => {
    console.log("Tabela 'Gerente' sincronizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a sincronização da tabela 'Gerente':", error);
  });

module.exports = Gerente;
