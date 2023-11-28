// app.js

const express = require("express");
const app = express();
const cors = require("cors");
const conexaodb = require("./database/db");
const SincronizarTabelas = require("./models/models")
const session = require("express-session")


app.use(
    session({
        secret: 'meu_segredo',
        resave: false,
        saveUninitialized: true,
        // Você pode configurar outros parâmetros de sessão, se necessário
    })
);

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
const atendenteRoutes = require("./routes/atendenteRoutes")
const API = require("./API/emailAPI")

app.use('/', clienteRoutes);
app.use('/', agendamentoRoutes);
app.use('/', servicoRoutes);
app.use('/', pacoteRoutes);
app.use('/', relacionamentoRoutes);
app.use('/', atendenteRoutes)
app.use('/', API)
/*app.get("/session", (req, res) => {
    req.session.nome = "teste";
    req.session.ano = 2023;
    req.session.email = "teste@teste.com";
    req.session.user = {
        id: 10,
        username: "maycon"
    };

    res.send("Sessão criada com sucesso!");
});
*/
app.get("/leitura", (req, res) => {
    res.json({
        nome: req.session.nome,
        ano: req.session.ano,
        email: req.session.email

    })
})
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor on-line! Acesse http://localhost:${port}`);
});
