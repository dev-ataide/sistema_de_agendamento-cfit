// pacotes.js
const express = require('express');
const router = express.Router();
const Pacote = require('../../models/Pacote'); // Importe o modelo Pacote

// Rota para buscar todos os pacotes
router.get('/pacotes', async (req, res) => {
    try {
        const pacotes = await Pacote.findAll();
        res.json(pacotes);
    } catch (error) {
        console.error('Erro ao buscar pacotes:', error);
        res.status(500).json({ error: 'Erro ao buscar pacotes' });
    }
});

module.exports = router;
