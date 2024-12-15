const validator = require("validator")
const Articulo = require("../models/Articulo")

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    })
}

const curso = (req, res) => {
    return res.status(200).json([{
        curso:"master en react",
        profesor: "Mario"
    },
    {
        curso:"master en js",
        profesor: "Victor"
    }
        
    ])
}

const crear = async (req, res) => {
    // Recoger parámetros por POST a guardar
    let parametros = req.body;

    // Validar datos
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo);
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se han validado los datos ingresados");
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar",
        });
    }

    // Crear el objeto a guardar automáticamente
    const articulo = new Articulo(parametros);

    // Guardar artículo en la base de datos
    try {
        const articuloGuardado = await articulo.save();
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo guardado con éxito",
            articulo: articuloGuardado,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha guardado el artículo",
            detalles: error.message,
        });
    }
};

module.exports = {
    prueba, 
    curso,
    crear
}