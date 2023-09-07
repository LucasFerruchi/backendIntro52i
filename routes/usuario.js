const { Router } = require("express");

const router = Router();

//PETICION GET: recibir datos
router.get("/", (req, res) => {
  res.json({
    mensaje: "recibo el mensaje",
  });
});

//PETICION POST: mandar datos
router.post("/", (req, res) => {
  res.json({
    mensaje: "envio el mensaje",
  });
});

//PETICION PUT: actualizar datos
router.put("/:id", (req, res) => {
  res.json({
    mensaje: "modifico el mensaje",
  });
});

//PETICION DELETE: borrar datos
router.delete("/:id", (req, res) => {
  res.json({
    mensaje: "elimino el mensaje",
  });
});

module.exports = router;
