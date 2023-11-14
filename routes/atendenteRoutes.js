
const express = require("express");
const router = express.Router();
const atendenteController = require("../Controllers/Atendente/atendenteController");

router.use('/', atendenteController);

module.exports = router;
