const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const UnidadeEmpresa = require("./UnidadeEmpresa");

const Gerente = sequelize.define("Gerente", {});

// Relacionamentos
Gerente.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um gerente pertence a uma unidade de empresa


module.exports = Gerente;
