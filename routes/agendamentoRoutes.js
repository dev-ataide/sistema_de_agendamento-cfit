const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento'); // Supondo que o modelo Agendamento esteja localizado aqui

// Rota para criar um novo agendamento (POST)
router.post('/agendamentos', async (req, res) => {
    try {
        const novoAgendamento = await Agendamento.create({
            dataHoraAgendamento: req.body.dataHoraAgendamento,
            disponibilidade: req.body.disponibilidade,
            statusAgendamento: req.body.statusAgendamento,
            idCliente: req.body.idCliente, // Associando o cliente ao agendamento
            idServico: req.body.idServico, // Associando o serviço ao agendamento
        });
        res.status(201).json(novoAgendamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o agendamento' });
    }
});

// Rota para atualizar um agendamento existente (PUT)
router.put('/agendamentos/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        agendamento.dataHoraAgendamento = req.body.dataHoraAgendamento;
        agendamento.disponibilidade = req.body.disponibilidade;
        agendamento.statusAgendamento = req.body.statusAgendamento;
        agendamento.idCliente = req.body.idCliente; // Atualizando a associação ao cliente
        agendamento.idUnidade = req.body.idUnidade; // Atualizando a associação à unidade de empresa
        agendamento.idServico = req.body.idServico; // Atualizando a associação ao serviço

        await agendamento.save(); // Salva as alterações no banco de dados

        res.status(200).json(agendamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
    }
});


// Rota para buscar todos os agendamentos (GET)
router.get('/agendamentos', async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os agendamentos' });
    }
});


module.exports = router;
