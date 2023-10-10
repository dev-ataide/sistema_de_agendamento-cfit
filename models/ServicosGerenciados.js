const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const UnidadeEmpresa = require("./UnidadeEmpresa");
const Servico = require("./Servico");

const ServicosGerenciados = sequelize.define("ServicosGerenciados", {
    nomeServico: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


ServicosGerenciados.belongsTo(UnidadeEmpresa, { foreignKey: "idUnidade" }); // Um serviço gerenciado pertence a uma unidade de empresa
ServicosGerenciados.belongsTo(Servico, { foreignKey: "idServico" }); // Um serviço gerenciado pertence a um serviço

module.exports = ServicosGerenciados;
