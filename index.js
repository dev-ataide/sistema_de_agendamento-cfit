const express = require("express");
const app = express();
const cors = require("cors");
const conexaodb = require("./database/db");
const sincronizarTabelas = require("./models/models");



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


const testeRoutes = require("./routes/testeRoute");
app.use('/', testeRoutes);

const clienteRoutes = require("./routes/clienteRoutes");
app.use('/', clienteRoutes);

const agendamentoRoutes = require("./routes/agendamentoRoutes");
app.use('/', agendamentoRoutes);


const servicoRoutes = require("./routes/servicoRoutes");
app.use('/', servicoRoutes)

const relacionamentoRoutes = require("./routes/routesRelacionamento");
app.use('/', relacionamentoRoutes)


const port = 8080;
app.listen(port, () => {
    console.log(`Servidor on-line! Acesse http://localhost:${port}`);
});
