const Usuario = require("../../models/Usuario");

// Função para validar um usuário pelo CPF ou e-mail
async function validarUsuario(cpf, email) {
  try {
    const usuarioPorCPF = await Usuario.findOne({ where: { cpf } });
    const usuarioPorEmail = await Usuario.findOne({ where: { email } });

    if (usuarioPorCPF) {
      console.log("CPF já existe");
      return { cpf: true, email: false };
    }

    if (usuarioPorEmail) {
      console.log("E-mail já existe");
      return { cpf: false, email: true };
    }

    console.log("CPF e e-mail são válidos");
    return { cpf: false, email: false };
  } catch (error) {
    console.error('Erro ao validar o usuário:', error);
    throw error;
  }
}

module.exports = { validarUsuario };
