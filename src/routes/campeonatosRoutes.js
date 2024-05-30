const express = require("express");
const router = express.Router();
const connection = require("../config/db");

router.post("/", (req, res) => {
  const { nome, times } = req.body;

  const INSERT_CAMPEONATO_QUERY =
    "INSERT INTO campeonatos (nome, times) VALUES (?, ?)";
  connection.query(
    INSERT_CAMPEONATO_QUERY,
    [nome, JSON.stringify(times)],
    (error, results) => {
      if (error) {
        console.error("Erro ao criar campeonato:", error);
        res.status(500).json({ message: "Erro ao criar campeonato." });
      } else {
        res.json({ message: "Campeonato criado com sucesso!" });
      }
    }
  );
});

router.get("/:campeonatoId/times", (req, res) => {
  const campeonatoId = req.params.campeonatoId;
  const SELECT_TIMES_QUERY = "SELECT times FROM campeonatos WHERE id = ?";
  connection.query(SELECT_TIMES_QUERY, [campeonatoId], (error, results) => {
    if (error) {
      console.error("Erro ao buscar times do campeonato:", error);
      res.status(500).json({ message: "Erro ao buscar times do campeonato." });
    } else {
      const timesDoCampeonato = results[0].times;
      res.json(timesDoCampeonato);
    }
  });
});

router.post("/salvar-chaveamento", (req, res) => {
  const { chaveamento, idCampeonato } = req.body;
  const INSERT_JOGOS_QUERY =
    "INSERT INTO jogos (chaveamento, id_campeonato) VALUES (?, ?)";
  connection.query(
    INSERT_JOGOS_QUERY,
    [JSON.stringify(chaveamento), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar chaveamento:", error);
        res.status(500).json({ message: "Erro ao salvar chaveamento." });
      } else {
        res.status(200).json({ message: "Chaveamento salvo com sucesso." });
      }
    }
  );
});

router.post("/salvar-resultado-quartas", (req, res) => {
  const { resultados, pontosTimes, idCampeonato } = req.body;
  const UPDATE_RESULTADO_QUERY =
    "UPDATE jogos SET resultado_quartas = ?, times_pontos = ? WHERE id_campeonato = ?";
  connection.query(
    UPDATE_RESULTADO_QUERY,
    [JSON.stringify(resultados), JSON.stringify(pontosTimes), idCampeonato],
    (error, results) => {
      if (error) {
        console.error(
          "Erro ao salvar resultados das quartas de finais:",
          error
        );
        res.status(500).json({
          message: "Erro ao salvar resultados das quartas de finais.",
        });
      } else {
        res.status(200).json({
          message: "Resultados das quartas de finais salvos com sucesso.",
        });
      }
    }
  );
});

router.post("/salvar-chaveamento-semi", (req, res) => {
  const { chaveamentoSemi, idCampeonato } = req.body;
  const INSERT_JOGOS_SEMI_QUERY =
    "UPDATE jogos SET chaveamento_semi = ? WHERE id_campeonato = ?";
  connection.query(
    INSERT_JOGOS_SEMI_QUERY,
    [JSON.stringify(chaveamentoSemi), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar chaveamento semi:", error);
        res.status(500).json({ message: "Erro ao salvar chaveamento semi." });
      } else {
        res
          .status(200)
          .json({ message: "Chaveamento semi salvo com sucesso." });
      }
    }
  );
});

router.post("/salvar-resultado-semi", (req, res) => {
  const { resultados, pontosTimes, idCampeonato } = req.body;
  const UPDATE_RESULTADO_QUERY =
    "UPDATE jogos SET resultado_semi = ?, times_pontos = ? WHERE id_campeonato = ?";
  connection.query(
    UPDATE_RESULTADO_QUERY,
    [JSON.stringify(resultados), JSON.stringify(pontosTimes), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar resultados das semi finais:", error);
        res.status(500).json({
          message: "Erro ao salvar resultados das semi finais.",
        });
      } else {
        res.status(200).json({
          message: "Resultados das semi finais salvos com sucesso.",
        });
      }
    }
  );
});

router.post("/salvar-chaveamento-final", (req, res) => {
  const { chaveamentoFinal, idCampeonato } = req.body;
  const INSERT_JOGOS_SEMI_QUERY =
    "UPDATE jogos SET chaveamento_final = ? WHERE id_campeonato = ?";
  connection.query(
    INSERT_JOGOS_SEMI_QUERY,
    [JSON.stringify(chaveamentoFinal), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar chaveamento final:", error);
        res.status(500).json({ message: "Erro ao salvar chaveamento final." });
      } else {
        res
          .status(200)
          .json({ message: "Chaveamento final salvo com sucesso." });
      }
    }
  );
});

router.post("/salvar-resultado-final", (req, res) => {
  const { resultados, pontosTimes, idCampeonato } = req.body;
  const UPDATE_RESULTADO_QUERY =
    "UPDATE jogos SET resultado_final = ?, times_pontos = ? WHERE id_campeonato = ?";
  connection.query(
    UPDATE_RESULTADO_QUERY,
    [JSON.stringify(resultados), JSON.stringify(pontosTimes), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar resultados das finais:", error);
        res.status(500).json({
          message: "Erro ao salvar resultados das finais.",
        });
      } else {
        res.status(200).json({
          message: "Resultados das finais salvos com sucesso.",
        });
      }
    }
  );
});

router.post("/salvar-chaveamento-terceiro", (req, res) => {
  const { chaveamentoTerceiro, idCampeonato } = req.body;
  const INSERT_JOGOS_SEMI_QUERY =
    "UPDATE jogos SET chaveamento_terceiro = ? WHERE id_campeonato = ?";
  connection.query(
    INSERT_JOGOS_SEMI_QUERY,
    [JSON.stringify(chaveamentoTerceiro), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar chaveamento final:", error);
        res.status(500).json({ message: "Erro ao salvar chaveamento final." });
      } else {
        res
          .status(200)
          .json({ message: "Chaveamento final salvo com sucesso." });
      }
    }
  );
});

router.post("/salvar-resultado-terceiro", (req, res) => {
  const { resultados, pontosTimes, idCampeonato } = req.body;
  const UPDATE_RESULTADO_QUERY =
    "UPDATE jogos SET resultado_terceiro = ?, times_pontos = ? WHERE id_campeonato = ?";
  connection.query(
    UPDATE_RESULTADO_QUERY,
    [JSON.stringify(resultados), JSON.stringify(pontosTimes), idCampeonato],
    (error, results) => {
      if (error) {
        console.error("Erro ao salvar resultados das finais:", error);
        res.status(500).json({
          message: "Erro ao salvar resultados das finais.",
        });
      } else {
        res.status(200).json({
          message: "Resultados das finais salvos com sucesso.",
        });
      }
    }
  );
});

module.exports = router;
