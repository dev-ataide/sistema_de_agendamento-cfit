const express = require('express');
const router = express.Router();
const Usuario = require('../../models/Usuario');






// Rota para autenticar o usuário
router.post('/autenticarUsuario', async (req, res) => {
    try {
        const { email, senha } = req.body; // Alteração feita aqui
        console.log(email, senha);
        
        // Verifique se o usuário com as credenciais fornecidas existe no banco de dados
        const usuario = await Usuario.findOne({ where: { email, senha } });

        if (usuario) {
            // Credenciais válidas, você pode retornar um token JWT como resposta, por exemplo
            // Aqui, estou retornando uma mensagem de sucesso, mas em produção, você deve usar autenticação segura
            res.status(200).json({ mensagem: 'Autenticado com sucesso' });
        } else {
            // Credenciais inválidas
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao autenticar o usuário' });
    }
});


// Rota para criar um novo usuário
router.post('/usuario', async (req, res) => {
    try {
        // Extrai os dados do corpo da solicitação (JSON) enviado pelo cliente
        const { nome, email, senha, cpf, numero_whatsapp, endereco, sexo, tipoUsuario } = req.body;

        // Crie o usuário no banco de dados
        const usuario = await Usuario.create({
            nome,
            email,
            senha,
            cpf,
            numero_whatsapp,
            endereco,
            sexo,
            tipoUsuario,
        });

        // Responda com o usuário criado (ou outra resposta apropriada)
        res.status(201).json(usuario);
    } catch (error) {
        // Em caso de erro, envie uma resposta de erro ao cliente
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar o usuário' });
    }
});



// Rota para obter informações de todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        // Busque todos os usuários no banco de dados
        const usuarios = await Usuario.findAll();

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum usuário encontrado' });
        }

        // Responda com a lista de usuários encontrados
        res.status(200).json(usuarios);
    } catch (error) {
        // Em caso de erro, envie uma resposta de erro ao cliente
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar informações dos usuários' });
    }
});

module.exports = router;
