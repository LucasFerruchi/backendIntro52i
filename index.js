// console.log("Hola 52i backend");
//--------------------------------------

//!NO USAR, SOLO EJEMPLO DE EXPRESS
// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hola 52i");
// });

// app.listen(3000);
//--------------------------------------

//!Estructura base REAL
const Server = require("./models/server");

const server = new Server();

server.listen();
