const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API do Resgate Animal está rodando!");
});

const animalRoutes = require("./routes/animalRoutes");
app.use("/dogs", animalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));