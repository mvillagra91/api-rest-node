const { connection } = require("./database/connection")
const express = require("express")
const cors = require("cors")

//Inicializar app
console.log("Cambio, hola que tal")

//Conectar a la base de datos
connection()

//Crear servidor Node
const app = express()
const puerto = 3900

//Configurar cors
app.use(cors())

//Convertir body a objeto js
app.use(express.json())

//crear rutas

//crear servidor y escuchar peticiones
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})