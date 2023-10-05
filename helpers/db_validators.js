const Usuario = require("../models/usuario");
const Rol = require("../models/rol");

//Funcion para validar usuario por el mail
const esMailValido = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en la base de datos!`);
  }
};

//Funcion para encontrar el rol en la DB
const esRolValido = async (rol) => {
  const existeRol = await Rol.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

//funcion para encontrar id valido
const esIdValido = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El Id ${id} no se encuentra en la base de datos!`);
  }
};

//Categoria existe
const esCategoriaValido = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La categoria ${id} no existe en la base de datos!`);
  }
};

module.exports = {
  esMailValido,
  esRolValido,
  esIdValido,
  esCategoriaValido,
};
