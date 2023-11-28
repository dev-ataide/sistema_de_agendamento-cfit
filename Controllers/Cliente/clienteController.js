const express = require('express');
const router = express.Router();
const Cliente = require('../../models/Cliente'); // Supondo que o modelo esteja localizado aqui
//const Pacote = require('../../models/Pacote')
const Agendamento = require('../../models/Agendamento'); // Supondo que você tenha um modelo Agendamento

//const clienteAuth = require('../../middlewares/clienteAuth')
const jwt = require('jsonwebtoken');

const JWTSecret = "123";

const nodemailer = require('nodemailer');
const transporter = require('../../API/emailConfig');

// Configuração do Nodemailer

/*router.post('/autenticarCliente1', async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log(email)
    console.log(senha)

    res.status(200).json({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao autenticar o cliente' });
  }
});
*/
const emailUser = 'devmaycon.emailteste@gmail.com'; // Seu e-mail

router.post('/clientes', async (req, res) => {
  try {
    // Supondo que os dados do cliente venham do corpo da requisição (req.body)
    const { nome, telefone, email, senha, foto, sexo, dataNascimento } = req.body;

    // Crie um novo cliente com os dados recebidos
    const novoCliente = await Cliente.create({
      nome,
      telefone,
      email,
      senha,
      foto,
      sexo,
      dataNascimento: '1990-10-12', // Apenas um exemplo fixo, você pode ajustar conforme necessário
      idasRestantes: 0
    });

    const mailOptions = {
      from: emailUser,
      to: novoCliente.email,
      subject: 'Bem-vindo!',
      text: `Olá ${novoCliente.nome}, bem-vindo à nossa plataforma! Esperamos que tenha uma ótima experiência.`,
    };

    console.log('Enviando e-mail de boas-vindas para:', novoCliente.email);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Erro ao enviar e-mail de boas-vindas:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail de boas-vindas' });
      } else {
        console.log('E-mail de boas-vindas enviado:', info.response);
        // Se quiser, pode enviar o novoCliente como resposta
        res.status(201).json({ message: 'Cliente criado com sucesso', novoCliente });
      }
    });
  } catch (error) {
    console.error('Erro ao criar o cliente:', error);
    res.status(500).json({ error: 'Erro ao criar o cliente' });
  }
});

router.post('/autenticarCliente', async (req, res) => {
  try {
    const email = req.body.email;
    const senha = req.body.senha;
    console.log(email)
    console.log(senha)

    // Verifique se o email e a senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    if (senha === cliente.senha) {
      jwt.sign({ id: cliente.id, email: cliente.email, nome: cliente.nome }, JWTSecret, { expiresIn: '7d' }, (err, token) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Falha Interna' });
        } else {
          // Retorna o token JWT e o ID do cliente
          res.status(200).json({ message: 'Autenticação bem-sucedida', token, id: cliente.id });

        }
      });
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao autenticar o cliente' });
  }
});


/*router.post('/clientes', async (req, res) => {
  try {
    const novoCliente = await Cliente.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.body.foto,
      sexo: req.body.sexo,
      dataNascimento: '1990-10-12',
      idasRestantes: 0
    });
    res.status(201).json(novoCliente);
    console.log(novoCliente)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o cliente' });
  }
});
*/

//      // Enviar e-mail de boas-vindas
//      enviarEmailBoasVindas(novoCliente.email, novoCliente.nome);


//router.get('/clientes', clienteAuth, async (req, res) => { } -> rota c autenticacao

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os clientes' });
  }
});

router.put('/clientes/:clienteId', async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    const clienteData = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email
    };

    // Atualize os dados do cliente com o ID especificado
    const [rowsUpdated, [updatedCliente]] = await Cliente.update(clienteData, {
      where: { id: clienteId },
      returning: true
    });

    if (rowsUpdated > 0) {
      res.status(200).json(updatedCliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o cliente' });
  }
});

// regra de negócio
router.post('/concluir-servico/:clienteId', async (req, res) => {
  try {
    const clienteId = req.params.clienteId;

    // Verifique se o cliente existe
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verifique se o cliente possui um pacote associado
    if (!cliente.pacoteId) {
      return res.status(400).json({ error: 'O cliente não possui um pacote associado' });
    }

    // Diminua em '1' a quantidade de IDAS restantes do cliente
    if (cliente.idasRestantes > 0) {
      cliente.idasRestantes -= 1;
      await cliente.save();
    } else {
      return res.status(400).json({ error: 'O cliente não tem mais IDAS restantes' });
    }

    res.status(200).json({ message: 'Serviço concluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao concluir o serviço' });
  }
});

// Rota para excluir um cliente (DELETE)
router.delete('/clientes/:clienteId', async (req, res) => {
  try {
    const clienteId = req.params.clienteId;

    // Use o método `destroy` para excluir um cliente pelo ID
    const deletedRowCount = await Cliente.destroy({
      where: { id: clienteId },
    });

    if (deletedRowCount > 0) {
      res.status(204).send(); // 204 No Content (cliente excluído com sucesso)
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o cliente' });
  }
});
router.get('/dados-cliente-agendamentos', async (req, res) => {
  try {
    // Use o método `findAll` para buscar todos os clientes com seus agendamentos
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Agendamento,
          attributes: ['dataHoraAgendamento', 'StatusDeConsulta'],
        },
      ],
    });

    // Mapeie os clientes e seus agendamentos para o formato desejado
    const dadosClientesAgendamentos = clientes.map(cliente => {
      const agendamentos = cliente.Agendamentos.map(agendamento => ({
        dataHoraAgendamento: agendamento.dataHoraAgendamento,
        StatusDeConsulta: agendamento.StatusDeConsulta,
      }));

      return {
        Cliente: {
          id: cliente.id,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
          // Adicione outros campos do cliente conforme necessário
        },
        'N° de Agendamentos': agendamentos.length,
        CONTATO: cliente.telefone || cliente.email,
        'Data do Último Agendamento': agendamentos.length > 0 ? agendamentos[agendamentos.length - 1].dataHoraAgendamento : null,
        'Consulta Realizada': agendamentos.length > 0 ? agendamentos.some(agendamento => agendamento.StatusDeConsulta === 'Realizada') : false,
        Detalhes: {
          agendamentos,
        },
      };
    });

    // Calcule o número total de agendamentos realizados por cliente
    const totalAgendamentosPorCliente = dadosClientesAgendamentos.reduce((total, cliente) => total + cliente['N° de Agendamentos'], 0);

    res.json({
      dadosClientesAgendamentos,
      totalAgendamentosPorCliente,
    });

  } catch (error) {
    console.error('Erro ao buscar dados da API', error);
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});
/*
// Detalhes Cliente
router.get('/clienteDetails/:clienteId', async (req, res) => {
  try {
    const clienteId = req.params.clienteId;

    // Use o método `findByPk` para buscar um cliente pelo ID
    const cliente = await Cliente.findByPk(clienteId, {
      include: [
        { model: Pacote, attributes: ['nomePacote', 'quantidadeTotalPacote', 'quantidadeRestanteCliente'] },
        {
          model: Agendamento,
          attributes: ['dataHoraAgendamento', 'disponibilidade', 'statusAgendamento', 'MetodoDePagamento', 'StatusDePagamento', 'StatusDeConsulta'],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const dadosCruzados = {
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        foto: cliente.foto,
        sexo: cliente.sexo,
        dataNascimento: cliente.dataNascimento,
        pacote: {
          id: cliente.pacoteId,
          nome: cliente.Pacote ? cliente.Pacote.nomePacote : null,
          quantidadeTotal: cliente.Pacote ? cliente.Pacote.quantidadeTotalPacote : null,
          quantidadeRestante: cliente.Pacote ? cliente.Pacote.quantidadeRestanteCliente : null,
        },
        idasRestantes: cliente.idasRestantes,
      },
      agendamentos: cliente.Agendamentos.map(agendamento => ({
        id: agendamento.id,
        dataHoraAgendamento: agendamento.dataHoraAgendamento,
        disponibilidade: agendamento.disponibilidade,
        statusAgendamento: agendamento.statusAgendamento,
        MetodoDePagamento: agendamento.MetodoDePagamento,
        StatusDePagamento: agendamento.StatusDePagamento,
        StatusDeConsulta: agendamento.StatusDeConsulta,
      })),
    };

    res.status(200).json(dadosCruzados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados detalhados do cliente' });
  }
});

router.get('/dados-cliente-agendamentos', async (req, res) => {
  try {
    // Use o método `findAll` para buscar todos os clientes com seus agendamentos
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Agendamento,
          attributes: ['dataHoraAgendamento', 'StatusDeConsulta'],
        },
      ],
    });

    // Mapeie os clientes e seus agendamentos para o formato desejado
    const dadosClientesAgendamentos = clientes.map(cliente => {
      const agendamentos = cliente.Agendamentos.map(agendamento => ({
        dataHoraAgendamento: agendamento.dataHoraAgendamento,
        StatusDeConsulta: agendamento.StatusDeConsulta,
      }));

      return {
        Cliente: {
          id: cliente.id,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
          // Adicione outros campos do cliente conforme necessário
        },
        'N° de Agendamentos': agendamentos.length,
        CONTATO: cliente.telefone || cliente.email,
        'Data do Último Agendamento': agendamentos.length > 0 ? agendamentos[agendamentos.length - 1].dataHoraAgendamento : null,
        'Consulta Realizada': agendamentos.length > 0 ? agendamentos.some(agendamento => agendamento.StatusDeConsulta === 'Realizada') : false,
        Detalhes: {
          agendamentos,
        },
      };
    });

    // Calcule o número total de agendamentos realizados por cliente
    const totalAgendamentosPorCliente = dadosClientesAgendamentos.reduce((total, cliente) => total + cliente['N° de Agendamentos'], 0);

    res.json({
      dadosClientesAgendamentos,
      totalAgendamentosPorCliente,
    });

  } catch (error) {
    console.error('Erro ao buscar dados da API', error);
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});
*/
module.exports = router;
