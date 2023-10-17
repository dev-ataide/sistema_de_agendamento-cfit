const express = require('express');
const router = express.Router();
const Servico = require('../models/Servico'); // Supondo que o modelo Servico esteja localizado aqui

// Rota para criar um novo serviço (POST)
router.post('/servicos', async (req, res) => {
  try {
    const novoServico = await Servico.create({
      nomeServico: req.body.nomeServico,
      descricao: req.body.descricao,
      duracao: req.body.duracao,
      preco: req.body.preco,
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
  

module.exports = router;
