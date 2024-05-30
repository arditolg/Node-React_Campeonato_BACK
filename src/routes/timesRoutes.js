const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  const SELECT_TIMES_QUERY = "SELECT * FROM times";

  connection.query(SELECT_TIMES_QUERY, (error, results) => {
    if (error) {
      console.error("Erro ao buscar times:", error);
      res.status(500).json({ message: "Erro ao buscar times." });
    } else {
      const timesComCaminhosCorrigidos = results.map((time) => ({
        ...time,
        escudo: time.escudo.replace(/\\/g, "/"),
      }));

      res.json(timesComCaminhosCorrigidos);
    }
  });
});

router.post("/", upload.single("escudo"), (req, res) => {
  const { nome } = req.body;
  const escudo = req.file.path;

  const INSERT_TIME_QUERY = "INSERT INTO times (nome, escudo) VALUES (?, ?)";
  connection.query(INSERT_TIME_QUERY, [nome, escudo], (error, results) => {
    if (error) {
      console.error("Erro ao cadastrar o time:", error);
      res.status(500).json({ message: "Erro ao cadastrar o time." });
    } else {
      res.json({ message: "Time cadastrado com sucesso!" });
    }
  });
});

module.exports = router;
