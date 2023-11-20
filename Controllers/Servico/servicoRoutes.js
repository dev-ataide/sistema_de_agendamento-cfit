const express = require('express');
const router = express.Router();
const Servico = require('../../models/Servico'); // Supondo que o modelo Servico esteja localizado aqui

router.post('/servicos', async (req, res) => {
  try {
    const { nomeServico, descricao, preco } = req.body;

    // Verifica se o serviço já existe pelo nome
    const servicoExistente = await Servico.findOne({ where: { nomeServico } });
    if (servicoExistente) {
      return res.status(400).json({ error: 'Já existe um serviço com este nome.' });
    }

    // Cria um novo serviço se não existir um com o mesmo nome
    const novoServico = await Servico.create({
      nomeServico,
      descricao,
      duracao: 0,
      preco,
    });
    res.status(201).json(novoServico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o serviço' });
  }
});

// Rota para atualizar um serviço existente (PUT)
router.put('/servicos/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    
    servico.nomeServico = req.body.nomeServico;
    servico.descricao = req.body.descricao;
    servico.duracao = req.body.duracao;
    servico.preco = req.body.preco;
    
    await servico.save(); // Salva as alterações no banco de dados
    
    res.status(200).json(servico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o serviço' });
  }
});

router.get('/servicos', async (req, res) => {
    try {
      const servicos = await Servico.findAll();
      res.status(200).json(servicos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os serviços' });
    }
  });
  

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



module.exports = router;
