const db = require("../config/fireBaseConfig");

const { upload } = require("../config/cloudinaryConfig");

db.settings({ ignoreUndefinedProperties: true })

exports.createAnimalWithImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Erro: Nenhuma imagem foi enviada" });
    }

    const { nome, tel, city, uf, street, breed, extraInfo } = req.body;

    // URL da imagem enviada para o Cloudinary
    const imageUrl = req.file.path;

    const novoAnimal = {
      nome,
      tel,
      city,
      uf,
      street,
      extraInfo,
      breed,
      image: imageUrl,
      dataRegistro: new Date(),
    };

    // Salva os dados no Firestore
    const docRef = await db.collection("dogs").add(novoAnimal);

    res.status(201).json({ id: docRef.id, ...novoAnimal });
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);
    res.status(500).json({ message: "Erro ao cadastrar animal", error });
  }
};

// Adicionar middleware de upload na rota POST
exports.uploadMiddleware = upload.single('image');

// GET: Lista todos os animais
exports.searchAnimals = async (req, res) => {
  try {
    const { _limit = 5, _page = 1, _sort = "dataRegistro", _order = "desc", lastDocId } = req.query;

    const limit = parseInt(_limit);
    let query = db.collection("dogs").orderBy(_sort, _order === "desc" ? "desc" : "asc").limit(limit);

    if (lastDocId) {
      const lastDocSnapshot = await db.collection("dogs").doc(lastDocId).get();
      query = query.startAfter(lastDocSnapshot);
    }

    const snapshot = await query.get();
    const animais = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({ data: animais, lastDocId: snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1].id : null });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar animais", error });
  }
};


