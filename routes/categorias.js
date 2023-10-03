const { Router } = require("express");
const { crearCategoria } = require("../controllers/categoriasCtrl");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

module.exports = router;
