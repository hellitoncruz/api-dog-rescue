const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tel: { type: String, required: true },
  city: { type: String, required: true },
  uf: { type: String, required: true },
  street: { type: String, required: true },
  breed: { type: String, required: true },
  extraInfo: { type: String },
  image: { type: String }, // Armazena a imagem como base64
  dataRegistro: { type: String, default: Date.now },
});

module.exports = mongoose.model("Animal", AnimalSchema);
