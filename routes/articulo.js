const express = require("express");
const router = express.Router();

const ArticuloController = require("../controllers/articulo")

//rutas de prueba
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.get("/cursos", ArticuloController.curso)

//ruta util (Post)
router.post("/crear", ArticuloController.crear)

//ruta util (Get)
router.get("/articulos/:ultimos?", ArticuloController.listar)
router.get("/articulo/:id", ArticuloController.uno)

//ruta util (Delete)
router.delete("/articulo/:id", ArticuloController.borrar)

//ruta util (Put)
router.put("/articulo/:id", ArticuloController.editar)

module.exports = router;