const { response, request } = require("express");
const Categoria = require("../models/categoria");

//RUTA GET-categorias
const obtenerCategorias = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(desde)
      .limit(limite)
      .populate("usuario", "correo"),
  ]);

  res.json({
    total,
    categorias,
  });
};

//RUTA GET-categoria
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "nombre correo"
  );

  res.json({
    categoria,
  });
};

//RUTA POST
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  //verificar si la categoria existe
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //Generar la info
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  //creo la nueva INSTANCIA
  const categoria = new Categoria(data);

  //Mandar a la base de datos
  await categoria.save();

  if (categoria) {
    res.status(200).json({
      categoria,

      msg: "La categoria se creo correctamente",
    });
  }
};

//PUT
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuario._id;

  //guardar la data
  const data = {
    nombre,
    usuario,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    msg: "Categoria actualizada!",
    categoria,
  });
};

//DELETE
const borrarcategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoriaEliminada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    categoriaEliminada,
    msg: "Categoria eliminada!",
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarcategoria,
};
