const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Pacote = require("./Pacote");

const Cliente = sequelize.define("Cliente", {
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
    pacoteId: {
        type: DataTypes.INTEGER, // Chave estrangeira que se relaciona com o ID do Pacote
        allowNull: true,
    },
    idasRestantes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, 
{
timestamps:false 

});

// Defina a relação entre Cliente e Pacote
Cliente.belongsTo(Pacote, { foreignKey: 'pacoteId' });

module.exports = Cliente;
