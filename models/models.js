// models.js
const Cliente = require("./models/Cliente");
const Gerente = require("./models/Gerente");
const UnidadeEmpresa = require("./models/UnidadeEmpresa");
const Usuario = require("./models/Usuario");
const Servico = require("./models/Servico");
const Agendamento = require("./models/Agendamento");
const TabelaTeste = require("./models/TabelaTeste");

// Chame a função de sincronização para cada modelo
Cliente.sync()
    .then(() => {
        console.log("Tabela 'Cliente' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'Cliente':", error);
    });

Gerente.sync()
    .then(() => {
        console.log("Tabela 'Gerente' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'Gerente':", error);
    });

UnidadeEmpresa.sync()
    .then(() => {
        console.log("Tabela 'UnidadeEmpresa' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'UnidadeEmpresa':", error);
    });

Usuario.sync()
    .then(() => {
        console.log("Tabela 'Usuario' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'Usuario':", error);
    });

Servico.sync()
    .then(() => {
        console.log("Tabela 'Servico' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'Servico':", error);
    });

Agendamento.sync()
    .then(() => {
        console.log("Tabela 'Agendamento' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'Agendamento':", error);
    });

TabelaTeste.sync()
    .then(() => {
        console.log("Tabela 'TabelaTeste' sincronizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro durante a sincronização da tabela 'TabelaTeste':", error);
    });
