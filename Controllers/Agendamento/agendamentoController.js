const express = require('express');
const router = express.Router();
const Agendamento = require('../../models/Agendamento'); // Supondo que o modelo Agendamento esteja localizado aqui
const Cliente = require('../../models/Cliente')
const Servico = require('../../models/Servico')

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
        agendamento.idServico = req.body.idServico; // Atualizando a associação ao serviço
        agendamento.disponibilidade = '0';
        await agendamento.save(); // Salva as alterações no banco de dados

        res.status(200).json(agendamento);
        console.log('Atualizacao feita!')
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
// Rota para buscar um agendamento pelo ID (GET)
router.get('/agendamentos/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }
        res.status(200).json(agendamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o agendamento' });
    }
});

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

// Rota para buscar agendamentos com base no ID ou nome do cliente (GET)
router.get('/agendamentos-filtrados', async (req, res) => {
    const { clienteId, nomeCliente } = req.query;

    try {
        let agendamentos;

        if (clienteId) {
            // Se um ID de cliente foi fornecido, filtre os agendamentos com base nele
            agendamentos = await Agendamento.findAll({
                include: [{ all: true }],
                where: { idCliente: clienteId },
                order: [['dataHoraAgendamento', 'DESC']]
            });
        } else if (nomeCliente) {
            // Se um nome de cliente foi fornecido, filtre os agendamentos com base nele
            agendamentos = await Agendamento.findAll({
                include: [{ all: true }],
                where: {
                    '$Cliente.nome$': {
                        [Sequelize.Op.like]: `${nomeCliente}%` // Adicione o '%' para corresponder a nomes que começam com a letra
                    }
                },
                order: [['dataHoraAgendamento', 'DESC']]
            });
        } else {
            // Se nenhum ID de cliente ou nome de cliente foi fornecido, busque todos os agendamentos
            agendamentos = await Agendamento.findAll({
                include: [{ all: true }],
                order: [['dataHoraAgendamento', 'DESC']]
            });
        }

        res.status(200).json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos filtrados' });
    }
});



router.post('/agendamento-atendente', async (req, res) => {
    try {
        const { dataHoraAgendamento, disponibilidade, statusAgendamento, MetodoDePagamento, StatusDePagamento, StatusDeConsulta, observacoes } = req.body;

        // Simulando o ID do cliente encontrado manualmente
        let clienteId = 1;
        let nomeServico = "Harmonização Facial"

        // Encontrar o cliente com base no ID fornecido
        const clienteEncontrado = await Cliente.findByPk(clienteId);

        if (!clienteEncontrado) {
            console.log("Error: Cliente não encontrado.")
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Encontrar o serviço com base no nome fornecido
        const servicoEncontrado = await Servico.findOne({ where: { nomeServico } });

        if (!servicoEncontrado) {
            console.log("Error: Serviço não encontrado.")
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }

        console.log('ID do Cliente:', clienteEncontrado.id);
        console.log('Nome do Cliente:', clienteEncontrado.nome);
        console.log('ID Serviço:', servicoEncontrado.id);
        console.log('Nome Serviço:', servicoEncontrado.nomeServico);

        const novoAgendamento = await Agendamento.create({
            dataHoraAgendamento,
            disponibilidade: 0,
            statusAgendamento,
            MetodoDePagamento,
            StatusDePagamento,
            StatusDeConsulta,
            observacoes,
            idCliente: clienteId, // Associando o cliente ao agendamento usando o ID encontrado
            idServico: servicoEncontrado.id, // Associando o serviço ao agendamento usando o ID encontrado pelo nome
        });

        res.status(201).json(novoAgendamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o agendamento' });
    }
});


module.exports = router;
