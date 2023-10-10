const express = require("express");
const app = express();
const cors = require("cors");
const conexaodb = require("./database/db");
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




const port = 8080;
app.listen(port, () => {
    console.log(`Servidor on-line! Acesse http://localhost:${port}`);
});
