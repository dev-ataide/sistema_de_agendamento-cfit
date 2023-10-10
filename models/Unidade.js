const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Servico = require("./Servico");

const Unidade = sequelize.define("Unidade", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});
// Relacionamentos
Unidade.hasMany(Servico); // Uma unidade possui muitos serviços

// Sincronização com o banco de dados
module.exports = Unidade;