const { Sequelize } = require("sequelize");

const DB_NAME = 'cfit2';
const DB_USER = 'root'; // em alguns bancos o padrão user é root
const DB_PASSWORD = 'maycon';

const conexaodb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = conexaodb;
