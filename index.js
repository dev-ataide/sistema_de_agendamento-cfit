// app.js

const express = require("express");
const app = express();
const cors = require("cors");
const conexaodb = require("./database/db");
const SincronizarTabelas = require("./models/models")

if (SincronizarTabelas) {
    console.log("{tables true}")
}
app.use(cors());
app.use(express.json());

conexaodb
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados!");
    })
    .catch((error) => {
        console.log(error);
    });

const clienteRoutes = require("./routes/clienteRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const pacoteRoutes = require("./routes/pacoteRoutes");
const relacionamentoRoutes = require("./routes/relacionamentosRoutes");

app.use('/', clienteRoutes);
app.use('/', agendamentoRoutes);
app.use('/', servicoRoutes);
app.use('/', pacoteRoutes);
app.use('/', relacionamentoRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor on-line! Acesse http://localhost:${port}`);
});
