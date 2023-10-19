// pacoteRoutes.js

const express = require("express");
const router = express.Router();
const pacoteController = require("../Controllers/Pacote/pacoteRoutes");

// Use o controlador nas rotas
router.use('/', pacoteController);

module.exports = router;
