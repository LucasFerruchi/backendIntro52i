const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  //obtener token
  const token = req.header("x-token");

  //Verificar token
  if (!token) {
    return res.status(401).json({
      msg: "no hay token en la peticion!",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //OBTENER DATOS DEL USUARIO
    const usuario = await Usuario.findById(uid);

    //Varificar q el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido, el usuario no existe!",
      });
    }

    //Varificar estado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido, usuario inactivo!",
      });
    }

    //guardar los datos del ususario
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no es valido!",
    });
  }
};

module.exports = {
  validarJWT,
};
