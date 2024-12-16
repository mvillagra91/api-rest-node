const express = require("express");
const router = express.Router();

const ArticuloController = require("../controllers/articulo")

//rutas de prueba
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.get("/cursos", ArticuloController.curso)

//ruta util (Get)
router.get("/articulos", ArticuloController.listar)

//ruta util (Post)
router.post("/crear", ArticuloController.crear)



module.exports = router;