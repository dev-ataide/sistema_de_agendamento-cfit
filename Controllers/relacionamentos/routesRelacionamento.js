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

//API que retorna informações para a tela principal

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



// Rota para obter todos os dados do cliente, agendamento e serviço relacionados
router.get('/detailsCliente/:idCliente', async (req, res) => {
  try {
    const idCliente = req.params.idCliente;

    // Busca o cliente pelo ID, incluindo informações do agendamento e serviço associados
    const cliente = await Cliente.findByPk(idCliente, {
      include: [
        {
          model: Agendamento,
          include: Servico,
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
