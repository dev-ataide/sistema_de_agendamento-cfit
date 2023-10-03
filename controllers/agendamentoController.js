// controllers/AgendamentoController.js
const express = require("express");
const router = express.Router();
const Agendamento = require("../models/Agendamento");
const { exibirDadosRecebidos } = require("../services/servicesAgendamento/showDataAgendamento");

// Rota para criar um novo agendamento (POST)
router.post('/agendamentos', async (req, res) => {
    try {
        const { data, horario, tipoServico, observacao, pacote, colaborador, metodoPagamento } = req.body;
        exibirDadosRecebidos(data,horario,tipoServico,observacao,pacote, colaborador, metodoPagamento)

        // Crie o agendamento
        const novoAgendamento = await Agendamento.create({
            data: data,
            horario: horario,
            tipoServico: tipoServico,
            observacao: observacao,
            pacote: pacote,
            colaborador: colaborador,
            metodoPagamento: metodoPagamento
        });

        res.status(201).json(novoAgendamento);
    } catch (error) {
        console.error('Erro ao criar o agendamento:', error);
        res.status(500).send('Erro ao criar o agendamento');
    }
});

// Rota para listar todos os agendamentos (GET)
router.get('/agendamentos', async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
        res.status(500).send('Erro ao buscar os agendamentos');
    }
});

module.exports = router;
