
const express = require("express");
const router = express.Router();
const usuarioController = require("../Controllers/Usuario/usuarioController");

router.use('/', usuarioController);

module.exports = router;
