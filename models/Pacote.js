const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Pacote = sequelize.define("Pacote", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nomePacote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidadeTotalPacote: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantidadeRestanteCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    createdAt: false, // Não incluir a coluna createdAt nas operações de criação
    updatedAt: false, // Não incluir a coluna updatedAt nas operações de atualização

});

module.exports = Pacote;
