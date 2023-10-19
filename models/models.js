// models.js
const Usuario = require("./Usuario");
const Cliente = require("./Cliente");
const Gerente = require("./Gerente");
const UnidadeEmpresa = require("./UnidadeEmpresa");
const Servico = require("./Servico");
const Agendamento = require("./Agendamento");
//const Horario = require("./Horario");
const Unidade = require("./Unidade");
const colaboradorServico = require("./relacionamentos/colaboradorServico");
const Colaborador = require("./Colaborador");
const unidadeColaborador = require("./relacionamentos/unidadeColaborador");
const unidadeCliente = require("./relacionamentos/unidadeCliente");
const Pacote = require("./Pacote");
//const servicosGerenciados = require("./ServicosGerenciados") -> Erro

// Chame a função de sincronização para cada modelo na ordem correta
(async () => {
  try {
    await Pacote.sync();
   // console.log("Tabela 'Pacote' sincronizada com sucesso!")

    await Usuario.sync();
   // console.log("Tabela 'Usuario' sincronizada com sucesso!");

    await Cliente.sync();
   // console.log("Tabela 'Cliente' sincronizada com sucesso!");

    await UnidadeEmpresa.sync();
    //console.log("Tabela 'UnidadeEmpresa' sincronizada com sucesso!");

    await Gerente.sync();
    //console.log("Tabela 'Gerente' sincronizada com sucesso!");

    await Unidade.sync();
    //console.log("Tabela 'Unidade' sincronizada com sucesso!");

    await Servico.sync();
    //console.log("Tabela 'Servico' sincronizada com sucesso!");

    await Agendamento.sync();
    //console.log("Tabela 'Agendamento' sincronizada com sucesso!");

    // Horario.sync(); ERRO DE SINTAXE
    

   // await colaboradorServico.sync(); -> ERRO DE RELACIONAMENTO
    //console.log("Tabela 'colaboradorServico' sincronizada com sucesso!");

    await Colaborador.sync();
    //console.log("Tabela 'Colaborador' sincronizada com sucesso!");

    await unidadeColaborador.sync();
    //console.log("Tabela 'unidadeColaborador' sincronizada com sucesso!");

    await unidadeCliente.sync();
    //console.log("Tabela 'unidadeCliente' sincronizada com sucesso!");

    
    // Adicione mais tabelas conforme necessário...
  } catch (error) {
    console.error("Erro durante a sincronização das tabelas:", error);
  }
})();
