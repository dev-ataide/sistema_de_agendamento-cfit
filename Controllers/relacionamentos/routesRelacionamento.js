// Rota para buscar informações de clientes, agendamentos e serviços (GET)
// Rota para buscar informações de clientes, agendamentos, serviços e pacotes (GET)


const express = require('express');
const router = express.Router();

// Importe os modelos
const Cliente = require('../../models/Cliente');
const Agendamento = require('../../models/Agendamento');
const Servico = require('../../models/Servico');
const Pacote = require('../../models/Pacote')
// Defina as associações entre as tabelas
Cliente.hasMany(Agendamento, { foreignKey: 'idCliente' });
Agendamento.belongsTo(Servico, { foreignKey: 'idServico' });


// Rota para buscar um cliente por ID (GET)
router.get('/informacoes/:clienteId', async (req, res) => {
  const { clienteId } = req.params;

  try {
    const cliente = await Cliente.findByPk(clienteId, {
      include: [
        { model: Agendamento, include: Servico },
        Pacote,
      ],
    });

    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações do cliente' });
  }
});

router.get('/informacoes', async (req, res) => {
  try {
    const informacoes = await Cliente.findAll({
      include: [
        { model: Agendamento, include: Servico },
        Pacote,  // Adicione a relação com o Pacote aqui
      ],
    });

    res.status(200).json(informacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações' });
  }
});


// Rota para buscar informações de agendamentos com serviços (GET)
router.get('/agendamentos-com-servicos', async (req, res) => {
  try {
      const agendamentos = await Agendamento.findAll({
          include: [Servico], // Inclua o modelo Servico na consulta
      });
      res.status(200).json(agendamentos);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os agendamentos com serviços' });
  }
});

module.exports = router;
