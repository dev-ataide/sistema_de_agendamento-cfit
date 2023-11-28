// emailConfig.js
const nodemailer = require('nodemailer');

const emailUser = ''; // Seu e-mail
const emailPass = ''; // Sua senha

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

module.exports = transporter;
