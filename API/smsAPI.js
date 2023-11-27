const express = require('express');
const router = express.Router();
const Pacote = require('../../models/Pacote');
const accountSid = 'YOUR_ACCOUNT_SID'; // Substitua pelo seu Account SID
const authToken = 'YOUR_AUTH_TOKEN'; // Substitua pelo seu Auth Token
const client = require('twilio')(accountSid, authToken);


router.post('/enviar-sms', async (req, res) => {
    const { numero, mensagem } = req.body; // Supondo que você envie o número e a mensagem no corpo da requisição

    try {
        await client.messages.create({
            body: mensagem,
            from: 'NUMERO_TWILIO', // Seu número Twilio
            to: numero // Número para o qual você deseja enviar a mensagem
        });

        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar SMS:', error);
        res.status(500).json({ error: 'Erro ao enviar SMS' });
    }
});

module.exports = router;
