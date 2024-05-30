const express = require("express");
const router = express.Router();
const connection = require("../config/db");

router.get("/", (req, res) => {
  const SELECT_CAMPEONATOS_QUERY =
    "SELECT id, nome, times FROM campeonatos c WHERE NOT EXISTS (SELECT 1 FROM jogos j WHERE j.id_campeonato = c.id AND (j.resultado_final IS NOT NULL AND j.resultado_terceiro IS NOT NULL))";
  connection.query(SELECT_CAMPEONATOS_QUERY, (error, results) => {
    if (error) {
      console.error("Erro ao buscar campeonatos:", error);
      res.status(500).json({ message: "Erro ao buscar campeonatos." });
    } else {
      res.json(results);
    }
  });
});

router.get("/finalizados", (req, res) => {
  const SELECT_CAMPEONATOS_QUERY =
    "SELECT id, nome, times FROM campeonatos c WHERE EXISTS (SELECT 1 FROM jogos j WHERE j.id_campeonato = c.id AND (j.resultado_final IS NOT NULL AND j.resultado_terceiro IS NOT NULL))";
  connection.query(SELECT_CAMPEONATOS_QUERY, (error, results) => {
    if (error) {
      console.error("Erro ao buscar campeonatos:", error);
      res.status(500).json({ message: "Erro ao buscar campeonatos." });
    } else {
      res.json(results);
    }
  });
});

router.get("/finalizados/:id", (req, res) => {
  const campeonatoId = req.params.id;
  const SELECT_RESULTADOS_QUERY = `
      SELECT j.resultado_final AS resultado_final, j.resultado_terceiro AS resultado_terceiro, c.nome AS campeonato_nome
      FROM jogos j
      INNER JOIN campeonatos c ON j.id_campeonato = c.id
      WHERE j.id_campeonato = ?
    `;

  // Imprimir o SQL no console log
  console.log("SQL sendo executado:", SELECT_RESULTADOS_QUERY);

  connection.query(SELECT_RESULTADOS_QUERY, campeonatoId, (error, results) => {
    if (error) {
      console.error("Erro ao buscar resultados:", error);
      res.status(500).json({ message: "Erro ao buscar resultados." });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
