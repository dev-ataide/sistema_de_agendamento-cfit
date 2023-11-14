// models.js
const Atendente = require("./Atendente");
const Cliente = require("./Cliente");
const Servico = require("./Servico");
const Agendamento = require("./Agendamento");
const Colaborador = require("./Colaborador");
const Pacote = require("./Pacote");

// Chame a função de sincronização para cada modelo na ordem correta
(async () => {
  try {
    await Pacote.sync();
   // console.log("Tabela 'Pacote' sincronizada com sucesso!")

    await Atendente.sync();
   // console.log("Tabela 'Atendente' sincronizada com sucesso!");

    await Cliente.sync();
   // console.log("Tabela 'Cliente' sincronizada com sucesso!");


    await Servico.sync();
    //console.log("Tabela 'Servico' sincronizada com sucesso!");

    await Agendamento.sync();
    //console.log("Tabela 'Agendamento' sincronizada com sucesso!");

    // Horario.sync(); ERRO DE SINTAXE
    

    //console.log("Tabela 'colaboradorServico' sincronizada com sucesso!");

    await Colaborador.sync();
    //console.log("Tabela 'Colaborador' sincronizada com sucesso!");


    
    // Adicione mais tabelas conforme necessário...
  } catch (error) {
    console.error("Erro durante a sincronização das tabelas:", error);
  }
})();
