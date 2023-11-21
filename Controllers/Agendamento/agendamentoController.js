const express = require('express');
const router = express.Router();
const Agendamento = require('../../models/Agendamento'); // Supondo que o modelo Agendamento esteja localizado aqui
const Cliente = require('../../models/Cliente')
const Servico = require('../../models/Servico')

router.post('/agendamentos', (req, res) => {
    Agendamento.findOne({
        where: {
            dataHoraAgendamento: req.body.dataHoraAgendamento,
            idCliente: req.body.idCliente,
            idServico: req.body.idServico,
        }
    })
        .then(existingAgendamento => {
            if (existingAgendamento) {
                return res.status(400).json({ error: 'Agendamento já existente.' });
            } else {
                Agendamento.create({
                    dataHoraAgendamento: req.body.dataHoraAgendamento,
                    disponibilidade: req.body.disponibilidade,
                    statusAgendamento: req.body.statusAgendamento,
                    MetodoDePagamento: req.body.MetodoDePagamento,
                    StatusDePagamento: req.body.StatusDePagamento,
                    StatusDeConsulta: req.body.StatusDeConsulta,
                    idCliente: req.body.idCliente,
                    idServico: req.body.idServico,
                })
                    .then(novoAgendamento => {
                        res.status(201).json(novoAgendamento);
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ error: 'Erro ao criar o agendamento' });
                    });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o agendamento existente' });
        });
});

router.put('/agendamentos/:id', (req, res) => {
    Agendamento.findByPk(req.params.id)
        .then(agendamento => {
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }
            agendamento.dataHoraAgendamento = req.body.dataHoraAgendamento;
            agendamento.disponibilidade = req.body.disponibilidade;
            agendamento.statusAgendamento = req.body.statusAgendamento;
            agendamento.idCliente = req.body.idCliente;
            agendamento.idServico = req.body.idServico;
            agendamento.disponibilidade = '0';

            agendamento.save()
                .then(updatedAgendamento => {
                    res.status(200).json(updatedAgendamento);
                    console.log('Atualizacao feita!');
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o agendamento' });
        });
});

router.get('/agendamentos', (req, res) => {
    Agendamento.findAll()
        .then(agendamentos => {
            res.status(200).json(agendamentos);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os agendamentos' });
        });
});

router.post('/agendamento-atendente', (req, res) => {

    const { dataHoraAgendamento, disponibilidade, statusAgendamento, MetodoDePagamento,
        StatusDePagamento, StatusDeConsulta, observacoes } = req.body;
    let clienteId = 1;
    let nomeServico = "Harmonização Facial";

    Cliente.findByPk(clienteId)
        .then(clienteEncontrado => {
            if (!clienteEncontrado) {
                console.log("Error: Cliente não encontrado.")
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            Servico.findOne({ where: { nomeServico } })
                .then(servicoEncontrado => {
                    if (!servicoEncontrado) {
                        console.log("Error: Serviço não encontrado.")
                        return res.status(404).json({ error: 'Serviço não encontrado' });
                    }
                    console.log('ID do Cliente:', clienteEncontrado.id);
                    console.log('Nome do Cliente:', clienteEncontrado.nome);
                    console.log('ID Serviço:', servicoEncontrado.id);
                    console.log('Nome Serviço:', servicoEncontrado.nomeServico);
                    return Agendamento.create({
                        dataHoraAgendamento,
                        disponibilidade: 0,
                        statusAgendamento,
                        MetodoDePagamento,
                        StatusDePagamento,
                        StatusDeConsulta,
                        observacoes,
                        idCliente: clienteId,
                        idServico: servicoEncontrado.id,
                    });
                })
                .then(novoAgendamento => {
                    res.status(201).json(novoAgendamento);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Erro ao criar o agendamento' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o agendamento' });
        });
});


/*
router.get('/agendamentos-com-servicos', async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            include: [{ all: true }],
            order: [['dataHoraAgendamento', 'DESC']] // Isso ordenará por dataHoraAgendamento em ordem decrescente (mais recente primeiro)
        });
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os agendamentos com serviços' });
    }
});
*/

module.exports = router;
