const express = require("express");
const router = express.Router();
const multer = require("multer");
const ArticuloController = require("../controllers/articulo")

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './imagenes/articulos/')
    },

    filename: function(req, file, cb){
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})

//rutas de prueba
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.get("/cursos", ArticuloController.curso)

//ruta util (Post)
router.post("/crear", ArticuloController.crear)
router.post("/subir-imagen/:id", [subidas.single('file0')], ArticuloController.subir)

//ruta util (Get)
router.get("/articulos/:ultimos?", ArticuloController.listar)
router.get("/articulo/:id", ArticuloController.uno)
router.get("/imagen/:fichero", ArticuloController.imagen)
router.get("/buscar/:busqueda", ArticuloController.buscador)

//ruta util (Delete)
router.delete("/articulo/:id", ArticuloController.borrar)

//ruta util (Put)
router.put("/articulo/:id", ArticuloController.editar)

module.exports = router;