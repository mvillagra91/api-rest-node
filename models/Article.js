const { Schema, model, default: mongoose } = require("mongoose");

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        require: true
    },
    contenido: {
        type: String,
        require: true
    },
    date: {
        type: String,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }
})

module.exports = model("Articulo", ArticuloSchema, "articulos");