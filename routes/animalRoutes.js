const express = require("express");
const router = express.Router();
const { createAnimalWithImg, searchAnimals, uploadMiddleware} = require("../controllers/animalController");

router.post("/", uploadMiddleware , createAnimalWithImg);
router.get("/", searchAnimals);

module.exports = router;