function exibirDadosRecebidos(nome, cpf, dataNascimento, sexo, cidade, estado, email) {
    console.log(" \n\n\n")
    console.log("Dados Recebidos:");
    console.log("Nome:", nome);
    console.log("CPF:", cpf);
    console.log("Data de Nascimento:", dataNascimento);
    console.log("Sexo:", sexo);
    console.log("Cidade:", cidade);
    console.log("Estado:", estado);
    console.log("E-mail:", email);
    console.log(" \n\n\n")
}

module.exports = { exibirDadosRecebidos };
