// relacionamentoRoutes.js

const express = require("express");
const router = express.Router();
const relacionamentoController = require("../Controllers/relacionamentos/routesRelacionamento");

// Use o controlador nas rotas
router.use('/', relacionamentoController);

module.exports = router;
