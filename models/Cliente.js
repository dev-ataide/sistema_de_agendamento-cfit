// Cliente.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Cliente = sequelize.define("Cliente", {
    numeroTelefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Cliente.sync();

module.exports = Cliente;
