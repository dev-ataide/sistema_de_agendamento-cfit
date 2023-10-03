const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const { validarUsuario } = require("../services/validarUsuario");

const { exibirDadosRecebidos } = require("../services/showDataUser");
// Rota para criar um novo usuário
router.post('/usuarios', async (req, res) => {
    const { nome, cpf, dataNascimento, sexo, cidade, estado, email } = req.body;
    exibirDadosRecebidos(nome, cpf, dataNascimento, sexo, cidade, estado, email);

    try {
        // Verifique se o usuário com o CPF ou e-mail já existe
        const { cpf: cpfExists, email: emailExists } = await validarUsuario(cpf, email);

        if (cpfExists) {
            res.status(400).send('CPF já cadastrado');
            return;
        }

        if (emailExists) {
            res.status(400).send('E-mail já cadastrado');
            return;
        }

        // Se o CPF e o e-mail não existirem, crie o usuário
        const usuarioCadastro = await Usuario.create({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            sexo: sexo,
            cidade: cidade,
            estado: estado,
            email: email,
        });

        console.log('Novo usuário criado:', usuarioCadastro.toJSON());
        res.status(201).send('Usuário criado com sucesso');
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).send('Erro ao criar o usuário');
    }
});


router.get('/usuarios', (req, res) => {
    Usuario.findAll()
        .then((usuarios) => {
            res.status(200).json(usuarios);
        })
        .catch((error) => {
            console.error('Erro ao buscar os usuários:', error);
            res.status(500).send('Erro ao buscar os usuários');
        });
});

module.exports = router; 
