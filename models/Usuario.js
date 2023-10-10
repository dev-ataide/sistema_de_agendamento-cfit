const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Cliente = require("./Cliente");
const Gerente = require("./Gerente");
const UnidadeEmpresa = require("./UnidadeEmpresa");

const Usuario = sequelize.define("Usuario", {
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
    tipoUsuario: {
        type: DataTypes.ENUM("cliente", "gerente", "administrador"), // Alterado para letras minúsculas
        allowNull: false,
    },
});

Usuario.hasOne(Cliente, { foreignKey: "idUsuario" });
Usuario.hasOne(Gerente, { foreignKey: "idUsuario" });
Usuario.hasOne(UnidadeEmpresa, { foreignKey: "idAdministrador" });

module.exports = Usuario;
