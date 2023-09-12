const { response, request } = require("express");

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
const usuariosPost = (req = request, res = response) => {
  const body = req.body;

  res.json({
    mensaje: "envio el mensaje",
    body,
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
