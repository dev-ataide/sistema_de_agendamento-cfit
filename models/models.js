// models.js
const Usuario = require("./Usuario");
const Cliente = require("./Cliente");
const Gerente = require("./Gerente");
const UnidadeEmpresa = require("./UnidadeEmpresa");
const Servico = require("./Servico");
const Agendamento = require("./Agendamento");

// Chame a função de sincronização para cada modelo na ordem correta
(async () => {
  try {
    await Usuario.sync();
    console.log("Tabela 'Usuario' sincronizada com sucesso!");

    await Cliente.sync();
    console.log("Tabela 'Cliente' sincronizada com sucesso!");

    await UnidadeEmpresa.sync();
    console.log("Tabela 'UnidadeEmpresa' sincronizada com sucesso!");

    await Gerente.sync();
    console.log("Tabela 'Gerente' sincronizada com sucesso!");

    await Servico.sync();
    console.log("Tabela 'Servico' sincronizada com sucesso!");

    await Agendamento.sync();
    console.log("Tabela 'Agendamento' sincronizada com sucesso!");
  } catch (error) {
    console.error("Erro durante a sincronização das tabelas:", error);
  }
})();
