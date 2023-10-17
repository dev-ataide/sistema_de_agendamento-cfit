const express = require('express');
const router = express.Router();

// Importe os modelos
const Cliente = require('../models/Cliente');
const Agendamento = require('../models/Agendamento');
const Servico = require('../models/Servico');

// Defina as associações entre as tabelas
Cliente.hasMany(Agendamento, { foreignKey: 'idCliente' });
Agendamento.belongsTo(Servico, { foreignKey: 'idServico' });

// Rota para buscar informações de clientes, agendamentos e serviços (GET)
router.get('/informacoes', async (req, res) => {
  try {
    const informacoes = await Cliente.findAll({
      include: [
        { model: Agendamento, include: Servico },
      ],
    });

    res.status(200).json(informacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações' });
  }
});

module.exports = router;
