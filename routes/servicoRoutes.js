// servicoRoutes.js

const express = require("express");
const router = express.Router();
const servicoController = require("../Controllers/Servico/servicoRoutes");

// Use o controlador nas rotas
router.use('/', servicoController);

module.exports = router;
