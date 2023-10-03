const { Router } = require("express");
//ExpressValidators
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const { check } = require("express-validator");
//Funcion validar CAMPOS (formulario de registro)
const { validarCampos } = require("../middlewares/validar_campos");

//importar funciones de controlador
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

//Validaciones de la BASE DE DATOS
const {
  esMailValido,
  esRolValido,
  esIdValido,
} = require("../helpers/db_validators");

const router = Router();

//PETICION GET: enviar datos
router.get("/", usuariosGet);

//PETICION POST: recibir datos
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio!").notEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres!"
    ).isLength({ min: 6 }),
    check("correo", "no es un correo valido!").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

//PETICION PUT: actualizar datos
router.put(
  "/:id",
  [
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosPut
);

//PETICION DELETE: borrar datos
router.delete(
  "/:id",
  [
    //Validar JWT
    validarJWT,
    //Valido el rol
    esAdminRole,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
