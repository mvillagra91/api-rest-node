const validarArticulo = require("../helpers/validar")
const validator = require("validator")
const Articulo = require("../models/Articulo")
const { error } = require("console")

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
        validarArticulo(parametros);
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
            detalles: error.message
        });
    }
};

const listar = async (req, res) => {
    try {

        //Construye la consulta base
        const consulta = Articulo.find({})
                                        .sort({date: -1})

        //Se agrega un limite si viene un parametro anexo
        if(req.params.ultimos){
            consulta.limit(3)
        }

        // Ejecuta la consulta una vez se agreguen todas las condiciones
        const articulos = await consulta.exec();

        // Verifica si no hay artículos
        if (!articulos || articulos.length === 0) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se han encontrado artículos!!"
            });
        }

        // Retorna la respuesta con los artículos
        return res.status(200).json({
            status: "success",
            parametro_url: req.params.ultimos,
            contador: articulos.length,
            articulos
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los artículos",
            error
        });
    }
};

const uno = async (req, res) => {
    try {
        // Buscar id por la URL
        let id = req.params.id;

        // Buscar artículo por su ID
        const articulo = await Articulo.findById(id).exec();

        // Si no existe, devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo",
            });
        }

        // Si existe, devolver resultado
        return res.status(200).json({
            status: "success",
            articulo,
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo"
        });
    }
};

const borrar = async (req, res) => {
    try {
        // Obtener el ID de la URL
        let id = req.params.id;

        // Buscar y borrar el artículo por su ID
        const articuloBorrado = await Articulo.findByIdAndDelete(id);

        // Si no se encuentra el artículo, devolver error
        if (!articuloBorrado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo a borrar",
            });
        }

        // Si se encuentra y borra, devolver resultado
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo borrado con éxito",
            articulo: articuloBorrado,
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            mensaje: "Error al intentar borrar el artículo",
            error,
        });
    }
};

const editar = async (req, res) => {
    try {
        // Obtener el ID de la URL
        let id = req.params.id;

        // Recoger datos del body
        const parametros = req.body;

        // Validar datos
        if (!parametros.titulo || !parametros.contenido || 
            validator.isEmpty(parametros.titulo) || 
            validator.isEmpty(parametros.contenido)) {
            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar o son inválidos",
            });
        }

        // Buscar y actualizar artículo
        const articuloActualizado = await Articulo.findOneAndUpdate(
            { _id: id }, 
            parametros, 
            { new: true } // Devuelve el documento actualizado
        );

        // Verificar si se encontró y actualizó el artículo
        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo a actualizar",
            });
        }

        // Devolver respuesta exitosa
        return res.status(200).json({
            status: "success",
            mensaje: "Articulo actualizado correctamente",
            articulo: articuloActualizado
        });

    } catch (error) {
        // Manejo de errores generales
        return res.status(500).json({
            status: "error",
            mensaje: "Error al intentar actualizar el artículo",
            error,
        });
    }
};

module.exports = {
    prueba, 
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar
}