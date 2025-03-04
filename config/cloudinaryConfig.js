const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); // Carrega as variáveis do .env

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração do Storage para Uploads com Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "animals", // Nome da pasta no Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Formatos permitidos
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Redimensiona imagens grandes
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
