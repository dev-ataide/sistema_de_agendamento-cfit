const express = require("express");
const router = express.Router();

const agendamentoController = require("../controllers/agendamentoController");

router.get("/", agendamentoController);
router.post("/", agendamentoController);



module.exports = agendamentoController;
