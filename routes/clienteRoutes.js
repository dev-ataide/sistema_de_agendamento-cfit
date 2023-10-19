// clienteRoutes.js

const express = require("express");
const router = express.Router();
const clienteController = require("../Controllers/Cliente/clienteController");

// Use o controlador nas rotas
router.use('/', clienteController);

module.exports = router;
