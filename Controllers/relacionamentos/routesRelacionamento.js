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
        { model: Cliente},  // Adicione a relação com o Pacote aqui
      ],
    });

    res.status(200).json(informacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações' });
  }
});


//Rota Excluida, mas tá aqui como backup
/*router.get('/informacoes', async (req, res) => {
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
*/
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



module.exports = router;
