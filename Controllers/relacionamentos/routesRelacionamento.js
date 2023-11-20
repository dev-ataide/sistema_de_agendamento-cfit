const express = require('express');
const router = express.Router();

// Models
const Cliente = require('../../models/Cliente');
const Agendamento = require('../../models/Agendamento');
const Servico = require('../../models/Servico');
const Pacote = require('../../models/Pacote')

// Defina as associações entre as tabelas
Cliente.hasMany(Agendamento, { foreignKey: 'idCliente' });
Agendamento.belongsTo(Servico, { foreignKey: 'idServico' });


router.get('/informacoes', async (req, res) => {
  try {
    const informacoes = await Agendamento.findAll({
      include: [
        { model: Servico },
        { model: Cliente }, 
      ],
      order: [['dataHoraAgendamento', 'DESC']], // Ordenar por dataHoraAgendamento de forma decrescente
    });

    res.status(200).json(informacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações' });
  }
});



module.exports = router;
