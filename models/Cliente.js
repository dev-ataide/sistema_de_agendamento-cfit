const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: { // Corrigi o nome do campo
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sexo: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: true,
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});


module.exports = Cliente;
