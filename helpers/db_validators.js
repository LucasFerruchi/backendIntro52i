const Usuario = require("../models/usuario");
const Rol = require("../models/rol");

//Mail existe?
const esMailValido = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en la base de datos!`);
  }
};

//Rol existe?
const esRolValido = async (rol) => {
  const existeRol = await Rol.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

//Usuario existe?
const esIdValido = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El Id ${id} no se encuentra en la base de datos!`);
  }
};

//Categoria existe?
const esCategoriaValido = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La categoria ${id} no existe en la base de datos!`);
  }
};

//Curso existe?
const esCursoValido = async (id) => {
  const existeCurso = await Curso.findById(id);

  if (!existeCurso) {
    throw new Error(`El Id ${id} no corresponde a un curso existente!`);
  }
};

module.exports = {
  esMailValido,
  esRolValido,
  esIdValido,
  esCategoriaValido,
  esCursoValido,
};
