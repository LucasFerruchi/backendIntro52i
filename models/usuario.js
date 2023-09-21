//modelo de datos de usuario

//nombre
//correo
//password
//img
//rol (user/admin)
//estado (true/false)
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    // enum: ["USER_ROLE", "ADMIN_ROLE"],
    // default: "USER_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);
