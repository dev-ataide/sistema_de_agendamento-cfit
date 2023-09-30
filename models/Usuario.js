const { DataTypes } = require("sequelize");
const conexaodb = require("../database/db");

const Usuario = conexaodb.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(14), // Considere o formato "XXX.XXX.XXX-XX"
        allowNull: false,
        unique: true,
    },
    dataNascimento: {
        type: DataTypes.DATEONLY, // Para armazenar apenas a data de nascimento
        allowNull: false,
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(2), // Considere o formato de sigla de estado, como "SP", "RJ", etc.
        allowNull: false,
    },
});

Usuario.sync()
module.exports = Usuario;

