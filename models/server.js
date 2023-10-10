const express = require("express");
//cors
const cors = require("cors");
//importar FUNCION base de datos
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    //Path del login
    this.authPath = "/api/auth";
    //Path de ususarios
    this.usuarioPath = "/api/usuarios";
    //Path de categorias
    this.categoriasPath = "/api/categorias";
    //Path de cursos
    this.cursosPath = "/api/cursos";
    //buscar
    this.buscarPath = "/api/buscar";

    //Base datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  //Base de datos
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //recibir datos .json
    this.app.use(express.json());

    //Mostrar archivos publicos
    this.app.use(express.static("public"));
  }

  routes() {
    //auth.js
    this.app.use(this.authPath, require("../routes/auth"));
    // usuario.js
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    //Categorias
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    //Cursos
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
