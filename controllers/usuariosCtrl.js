const { response, request } = require("express");

const bcrypt = require("bcryptjs");

//importar el schem usuario
const Usuario = require("../models/usuario");

//Pet GET
const usuariosGet = async (req = request, res = response) => {
  // const { apiKey, limit } = req.query;
  const { desde = 0, limite = 0 } = req.query;

  //Usuarios activos
  const query = { estado: true };

  // //Enviar toda la base de datos
  // const usuarios = await Usuario.find();

  //Enviar datos segun PARAMETROS
  // const usuarios = await Usuario.find().skip(desde).limit(limite);
  // const total = await Usuario.countDocuments();

  //Enviar datos segun PARAMETROS - respuesta OPTIMIZADA
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    mensaje: "Envio datos!",
    // apiKey,
    // limit,
    total,
    usuarios,
  });
};

const obtenerUsuario = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
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
const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, ...updUsuario } = req.body;

  //Encriptar password nuevamente
  // if (password) {
  //   const salt = bcrypt.genSaltSync(10);
  //   updUsuario.password = bcrypt.hashSync(password, salt);
  // }

  const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, {
    new: true,
  });

  res.json({
    mensaje: "Datos de ususario actualizados",
    password,
    id,
    usuario,
  });
};

//DELETE
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //Datos del ususario que hace el pedido
  const usuarioAdmin = req.usuario;

  // //Borrar DEFINITIVAMENTE un usuario
  // const usuarioEliminado = await Usuario.findByIdAndDelete(id);

  //Cambiar el ESTADO del usuario
  const usuario = await Usuario.findById(id);

  //Primero validar que el estado NO ESTE EN FALSE
  if (!usuario.estado) {
    return res.json({
      msg: "El usuario ya esta inactivo!",
    });
  }

  //Encontrar el id y cambiar el valor del estado
  const usuarioInactivo = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    mensaje: "Usuario eliminado!",
    // usuarioEliminado,
    usuarioInactivo,
    //Mostrar los datos del usuario que hizo el pedido
    usuarioAdmin,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  obtenerUsuario,
};
