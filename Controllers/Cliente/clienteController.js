const express = require('express');
const router = express.Router();
const Cliente = require('../../models/Cliente'); // Supondo que o modelo esteja localizado aqui
const Pacote = require('../../models/Pacote')
const Agendamento = require('../../models/Agendamento'); // Supondo que você tenha um modelo Agendamento

const clienteAuth = require('../../middlewares/clienteAuth')

const jwt = require('jsonwebtoken');

const JWTSecret = "123";

// Rota para autenticar um cliente
// Rota para autenticar um cliente
router.post('/autenticarCliente', async (req, res) => {
  try {
    const email = req.body.email;
    const senha = req.body.senha;

    // Verifique se o email e a senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Busque o cliente com o email fornecido
    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    // Verifique se a senha fornecida coincide com a senha no banco de dados (em texto simples)
    if (senha === cliente.senha) {
      // Senha correta, cliente autenticado
      // Vamos gerar um token JWT para este cliente
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
      // Senha incorreta
      res.status(401).json({ error: 'Email ou senha incorretos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao autenticar o cliente' });
  }
});


router.post('/clientes', async (req, res) => {
  try {
    const novoCliente = await Cliente.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.body.foto,
      sexo: req.body.sexo,
      dataNascimento: req.body.dataNascimento,
      idasRestantes: 0
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o cliente' });
  }
});

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

router.get('/clientes/:clienteId', async (req, res) => {
  try {
    const clienteId = req.params.clienteId;

    // Use o método `findByPk` para buscar um cliente pelo ID
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o cliente' });
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




module.exports = router;
