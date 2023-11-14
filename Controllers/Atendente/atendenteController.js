const express = require('express');
const router = express.Router();
const Atendente = require('../../models/Atendente');

// Rota para autenticar o atendente
router.post('/autenticarAtendente', async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log(email, senha);

        // Verifique se o atendente com as credenciais fornecidas existe no banco de dados
        const atendente = await Atendente.findOne({ where: { email, senha } });

        if (atendente) {
            // Credenciais válidas, você pode retornar um token JWT como resposta, por exemplo
            // Aqui, estou retornando uma mensagem de sucesso, mas em produção, você deve usar autenticação segura
            res.status(200).json({ mensagem: 'Autenticado com sucesso' });
        } else {
            // Credenciais inválidas
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao autenticar o atendente' });
    }
});

// Rota para criar um novo atendente
router.post('/atendente', async (req, res) => {
    try {
        // Extrai os dados do corpo da solicitação (JSON) enviado pelo cliente
        const { nome, email, senha, cpf, numero_whatsapp, endereco, sexo } = req.body;

        // Crie o atendente no banco de dados
        const atendente = await Atendente.create({
            nome,
            email,
            senha,
            cpf,
            numero_whatsapp,
            endereco,
            sexo,
        });

        // Responda com o atendente criado (ou outra resposta apropriada)
        res.status(201).json(atendente);
    } catch (error) {
        // Em caso de erro, envie uma resposta de erro ao cliente
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar o atendente' });
    }
});

// Rota para obter informações de todos os atendentes
router.get('/atendentes', async (req, res) => {
    try {
        // Busque todos os atendentes no banco de dados
        const atendentes = await Atendente.findAll();

        if (!atendentes || atendentes.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum atendente encontrado' });
        }

        // Responda com a lista de atendentes encontrados
        res.status(200).json(atendentes);
    } catch (error) {
        // Em caso de erro, envie uma resposta de erro ao cliente
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar informações dos atendentes' });
    }
});

module.exports = router;
