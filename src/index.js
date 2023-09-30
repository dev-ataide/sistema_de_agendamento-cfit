const express = require("express")
const app = express()
const cors = require("cors")

// Import BD
const conexaodb = require("./database/db")
//Import Controllers
const UserController = require("./Usuario/UserController")

//utilizando o EXPRESS
app.use(cors())
app.use(express.json())

//Conexao c banco de dados
conexaodb
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados!")
    }).catch((error) => {
        console.log(error)
    })




//Rota-TESTE
app.get("/", (req, res) => {
    res.send("hi")
})

app.use('/', UserController)

// Porta do servidor
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor on-line! Acesse http://localhost:${port}`);
});