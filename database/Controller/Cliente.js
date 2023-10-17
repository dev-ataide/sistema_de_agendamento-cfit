const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente'); // Supondo que o modelo esteja localizado aqui

// Rota para criar um novo cliente (POST)
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
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o cliente' });
  }
});

// Rota para atualizar um cliente existente (PUT)
router.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    cliente.nome = req.body.nome;
    cliente.telefone = req.body.telefone;
    cliente.email = req.body.email;
    cliente.senha = req.body.senha;
    cliente.foto = req.body.foto;
    cliente.sexo = req.body.sexo;
    cliente.dataNascimento = req.body.dataNascimento;
    
    await cliente.save(); // Salva as alterações no banco de dados
    
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o cliente' });
  }
});

module.exports = router;
