const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Criação de um novo Usuario
router.post('/usuarios', (req, res) => {
    const { nome, cpf, dataNascimento, sexo, cidade, estado } = req.body;
    
    console.log("Dados Recebidos:");
    console.log("Nome:", nome);
    console.log("CPF:", cpf);
    console.log("Data de Nascimento:", dataNascimento);
    console.log("Sexo:", sexo);
    console.log("Cidade:", cidade);
    console.log("Estado:", estado);

    Usuario.create({
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        sexo: sexo,
        cidade: cidade,
        estado: estado,
    })
        .then((usuarioCadastro) => {
            console.log('Novo usuário criado:', usuarioCadastro.toJSON());
            res.status(201).send('Usuário criado com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao criar o usuário:', error);
            res.status(500).send('Erro ao criar o usuário');
        });
});
module.exports = router; 
