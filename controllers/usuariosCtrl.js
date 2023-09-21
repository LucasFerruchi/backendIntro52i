const { response, request } = require("express");

const bcrypt = require("bcryptjs");

//importar el schem usuario
const Usuario = require("../models/usuario");

//Pet GET
const usuariosGet = (req = request, res = response) => {
  const { apiKey, limit } = req.query;

  res.json({
    mensaje: "recibo el mensaje",
    apiKey,
    limit,
  });
};

//POST
const usuariosPost = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encryptar contraseña
  const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  // usuario.password = hash;
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar datos en BASE DE DATOS
  await usuario.save();

  res.json({
    usuario,
    mensaje: "El usuario se creo correctamente!",
  });
};

//PUT
const usuariosPut = (req = request, res = response) => {
  res.json({
    mensaje: "modifico el mensaje",
  });
};

//DELETE
const usuariosDelete = (req = request, res = response) => {
  res.json({
    mensaje: "elimino el mensaje",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
