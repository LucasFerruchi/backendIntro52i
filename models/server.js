const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.authPath = "/api/auth";
    this.usuarioPath = "/api/usuarios";
    this.categoriasPath = "/api/categorias";
    //cursos
    this.cursosPath = "/api/cursos";
    //buscar
    this.buscarPath = "/api/buscar";

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    //Ruta de cursos
    this.app.use(this.cursosPath, require("../routes/cursos"));
    //Buscador
    this.app.use(this.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online", this.port);
    });
  }
}

module.exports = Server;
