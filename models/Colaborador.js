const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Colaborador = sequelize.define("Colaborador", {
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
  status: {
    type: DataTypes.BOOLEAN,
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
});


Colaborador.sync();
module.exports = Colaborador;

