const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

//Inicializar app
console.log("Cambio, hola que tal");

//Conectar a la base de datos
connection();

//Crear servidor Node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());

//Convertir body a objeto js
app.use(express.json());

//crear rutas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([{
        curso:"master en react"
    },
    {
        curso:"master en js"
    }
        
    ]
)})

app.get("/", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send(
        "<h1> Empezando a crear una api rest con node </h1>"
)})

//crear servidor y escuchar peticiones
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})