// emailConfig.js
const nodemailer = require('nodemailer');

const emailUser = 'devmaycon.emailteste@gmail.com'; // Seu e-mail
const emailPass = 'uyvz gkzo bxom vjhb'; // Sua senha
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
