const express = require('express');
const router = express.Router();
const Atendente = require('../../models/Atendente');

router.post('/autenticarAtendente', (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);

    Atendente.findOne({ where: { email, senha } })
        .then(atendente => {
            if (atendente) {
                res.status(200).json({ mensagem: 'Autenticado com sucesso' });
            } else {
                res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao autenticar o atendente' });
        });
});

router.post('/atendente', (req, res) => {
    const { nome, email, senha, cpf, numero_whatsapp, endereco, sexo } = req.body;
    
    Atendente.create({
        nome,
        email,
        senha,
        cpf,
        numero_whatsapp,
        endereco,
        sexo,
    })
        .then(atendente => {
            res.status(201).json(atendente);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao criar o atendente' });
        });
});

router.get('/atendentes', (req, res) => {
    Atendente.findAll()
        .then(atendentes => {
            if (!atendentes || atendentes.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum atendente encontrado' });
            }
            res.status(200).json(atendentes);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar informações dos atendentes' });
        });
});

module.exports = router;
