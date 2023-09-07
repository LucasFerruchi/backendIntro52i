const express = require("express");

class Server {
  constructor() {
    this.app = express();

    this.usuarioPath = "/api/usuarios";

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  middlewares() {
    //CORS
    //Mostrar archivos publicos
    this.app.use(express.static("public"));
  }

  routes() {
    //GET, POST, PUT, DELETE
    // usuario.js
    this.app.use(this.usuarioPath, require("../routes/usuario"));
  }
  listen() {
    this.app.listen(3000, () => {
      console.log("Server Online");
    });
  }
}

module.exports = Server;
