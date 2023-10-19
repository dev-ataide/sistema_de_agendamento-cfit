// agendamentoRoutes.js

const express = require("express");
const router = express.Router();
const agendamentoController = require("../Controllers/Agendamento/agendamentoController");

// Use o controlador nas rotas
router.use('/', agendamentoController);

module.exports = router;
