const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Atendente = sequelize.define("Atendente", {
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
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
    },
    numeroWapp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sexo: {
        type: DataTypes.ENUM("masculino", "feminino", "outro"), // Alterado para letras minúsculas
        allowNull: false,
    },
},
 {
    timestamps:false
 }
);


module.exports = Atendente;
