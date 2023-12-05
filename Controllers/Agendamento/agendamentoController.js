const express = require('express');
const router = express.Router();
const Agendamento = require('../../models/Agendamento'); // Supondo que o modelo Agendamento esteja localizado aqui
const Cliente = require('../../models/Cliente')
const Servico = require('../../models/Servico')
const { Op } = require('sequelize');
const transporter = require('../../API/emailConfig');
const emailUser = require('../../API/emailConfig')

router.post('/agendamentos', (req, res) => {
    console.log('Recebendo requisição POST para criar agendamento:', req.body);

    Agendamento.findOne({
        where: {
            dataHoraAgendamento: req.body.dataHoraAgendamento,
            idCliente: req.body.idCliente,
            idServico: req.body.idServico,
        }
    })
        .then(existingAgendamento => {
            console.log('Agendamento existente:', existingAgendamento);

            if (existingAgendamento) {
                console.log('Agendamento já existente. Retornando erro 400.');
                return res.status(400).json({ error: 'Agendamento já existente.' });
            } else {
                console.log('Criando novo agendamento.');
                Agendamento.create({

                    dataHoraAgendamento: req.body.dataHoraAgendamento,
                    disponibilidade: 0,
                    statusAgendamento: "Pendente",
                    MetodoDePagamento: req.body.MetodoDePagamento,
                    StatusDePagamento: "Concluido",
                    StatusDeConsulta: "Pendente",
                    idCliente: req.body.idCliente,
                    idServico: req.body.idServico

                })
                    .then(novoAgendamento => {
                        console.log('Novo agendamento criado:', novoAgendamento.toJSON());
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

router.get('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;

    Agendamento.findOne({
        where: {
            id: agendamentoId
        },
        include: [
            {
                model: Cliente,
                attributes: ['nome', 'email']
            },
            {
                model: Servico,
                attributes: ['nomeServico']
            }
        ]
    })
        .then(agendamento => {
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }
            res.status(200).json(agendamento);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o agendamento' });
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
                        disponibilidade: 1,
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
router.delete('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;

    Agendamento.findByPk(agendamentoId)
        .then(agendamento => {
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }

            agendamento.destroy()
                .then(() => {
                    res.status(200).json({ message: 'Agendamento excluído com sucesso' });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Erro ao excluir o agendamento' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o agendamento' });
        });
});

function enviarEmailLembrete(cliente) {
    const mailOptions = {
        from: transporter.options.auth.user,
        to: cliente.email,
        subject: 'Lembrete de consulta',
        text: `Olá ${cliente.nome}, este é um lembrete para a sua consulta agendada para hoje. Não se esqueça!`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Erro ao enviar e-mail de lembrete:', error);
        } else {
            console.log('E-mail de lembrete enviado para:', cliente.email);
        }
    });
}

function verificarAgendamentos() {
    console.log('Verificando agendamentos pendentes...');

    const dataAtual = new Date();
    const limiteDias = 2; // A partir de dois dias após a data atual

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + limiteDias); // Define a data limite como hoje + 2 dias

    console.log('Data atual:', dataAtual);
    console.log('Data limite:', dataLimite);

    Agendamento.findAll({
        where: {
            dataHoraAgendamento: {
                [Op.between]: [dataAtual, dataLimite], // Entre a data atual e a data limite
            },
            statusAgendamento: 'Pendente' // Filtra apenas os agendamentos com status "Pendente"
        },
        include: [{
            model: Cliente,
            attributes: ['nome', 'email'] // Para trazer informações do cliente associado ao agendamento
        }],
        order: [['dataHoraAgendamento', 'ASC']] // Ordena os resultados por data/hora
    })
    .then(agendamentos => {
        console.log('Agendamentos encontrados:', agendamentos.length);
        if (agendamentos.length > 0) {
            console.log('Consultas pendentes encontradas:');
            agendamentos.forEach(agendamento => {
                const dataFormatada = agendamento.dataHoraAgendamento.toLocaleString('pt-BR');
                console.log(`- Data/Hora: ${dataFormatada}, Cliente: ${agendamento.Cliente.nome}, E-mail: ${agendamento.Cliente.email}`);
                
                // Enviar e-mail de lembrete para cada cliente
                enviarEmailLembrete(agendamento.Cliente);
            });
        } else {
            console.log('Nenhuma consulta pendente encontrada nos próximos dias.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar agendamentos pendentes:', error);
    });
}

//se tirar os comentários o lembrete será ativado 
/*const intervaloVerificacao = 30000; // 5 segundos em milissegundos

setInterval(verificarAgendamentos, intervaloVerificacao);
verificarAgendamentos();
*/





















//TRASH

/*function verificarAgendamentos() {
    console.log('Verificando agendamentos pendentes...');

    const dataAtual = new Date();
    const limiteDias = 2; // A partir de dois dias após a data atual

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + limiteDias); // Define a data limite como hoje + 2 dias

    console.log('Data atual:', dataAtual);
    console.log('Data limite:', dataLimite);

    Agendamento.findAll({
        where: {
            dataHoraAgendamento: {
                [Op.between]: [dataAtual, dataLimite], // Entre a data atual e a data limite
            },
            statusAgendamento: 'Pendente' // Filtra apenas os agendamentos com status "Pendente"
        },
        order: [['dataHoraAgendamento', 'ASC']] // Ordena os resultados por data/hora
    })
    .then(agendamentos => {
        console.log('Agendamentos encontrados:', agendamentos.length);
        if (agendamentos.length > 0) {
            console.log('Consultas pendentes encontradas:');
            agendamentos.forEach(agendamento => {
                const dataFormatada = agendamento.dataHoraAgendamento.toLocaleString('pt-BR');
                console.log(`- Data/Hora: ${dataFormatada}, Cliente: ${agendamento.idCliente}, Serviço: ${agendamento.idServico}`);
            });
        } else {
            console.log('Nenhuma consulta pendente encontrada nos próximos dias.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar agendamentos pendentes:', error);
    });
}

const intervaloVerificacao = 5000; // 5 segundos em milissegundos

setInterval(verificarAgendamentos, intervaloVerificacao);
verificarAgendamentos();
*/
/*function verificarAgendamentos() {
    console.log('Verificando agendamentos pendentes...');

    const dataAtual = new Date();

    Agendamento.findAll({
        where: {
            dataHoraAgendamento: {
                [Op.gte]: dataAtual
            },
            statusAgendamento: 'Pendente' // Filtra apenas os agendamentos com status "Pendente"
        }
    })
    .then(agendamentos => {
        if (agendamentos.length > 0) {
            console.log('Consultas pendentes encontradas:');
            agendamentos.forEach(agendamento => {
                const dataFormatada = agendamento.dataHoraAgendamento.toLocaleString('pt-BR');
                console.log(`- Data/Hora: ${dataFormatada}, Cliente: ${agendamento.idCliente}, Serviço: ${agendamento.idServico}`);
            });
        } else {
            console.log('Nenhuma consulta pendente encontrada nos próximos dias.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar agendamentos pendentes:', error);
    });
}

const intervaloVerificacao = 5000; // 5 segundos em milissegundos

setInterval(verificarAgendamentos, intervaloVerificacao);
verificarAgendamentos();
*/
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
