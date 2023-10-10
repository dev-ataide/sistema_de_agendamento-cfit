// Usuario.js
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
        type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM("Cliente", "Gerente", "Administrador"),
        allowNull: false,
    },
});

Usuario.hasOne(Cliente, { foreignKey: "idUsuario" }); // Um usuário tem um cliente associado
Usuario.hasOne(Gerente, { foreignKey: "idUsuario" }); // Um usuário tem um gerente associado
Usuario.hasOne(UnidadeEmpresa, { foreignKey: "idAdministrador" }); // Um usuário administrador está associado a uma unidade de empresa

Usuario.sync()
  .then(() => {
    console.log("Tabela 'Usuario' sincronizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a sincronização da tabela 'Usuario':", error);
  });

module.exports = Usuario;
