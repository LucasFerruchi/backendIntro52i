const { Router } = require("express");
//importar funciones de controlador
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

const router = Router();

//PETICION GET: recibir datos
router.get("/", usuariosGet);

//PETICION POST: mandar datos
router.post("/", usuariosPost);

//PETICION PUT: actualizar datos
router.put("/:id", usuariosPut);

//PETICION DELETE: borrar datos
router.delete("/:id", usuariosDelete);

module.exports = router;
