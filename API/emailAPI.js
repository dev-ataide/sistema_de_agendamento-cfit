const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const emailUser = 'teste@teste.com'; // Seu e-mail
const emailPass = '123'; // Sua senha

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

// Função para enviar e-mail
function enviarEmail(emailDestino, assunto, mensagem, res) {
    const mailOptions = {
        from: emailUser,
        to: emailDestino,
        subject: assunto,
        text: mensagem,
    };

    console.log('Enviando e-mail para:', emailDestino);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ error: 'Erro ao enviar o e-mail' });
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        }
    });
}

// Rota para enviar e-mail
router.post('/enviar-email', async (req, res) => {
    try {
        const { emailDestino, assunto, mensagem } = req.body;
        enviarEmail(emailDestino, assunto, mensagem, res);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    }
});

module.exports = router;
