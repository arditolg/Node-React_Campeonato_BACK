const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const connection = require("./config/db");
const timesRoutes = require("./routes/timesRoutes");
const campeonatosRoutes = require("./routes/campeonatosRoutes");
const campeonatosListRoutes = require("./routes/campeonatoslistaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/api/test", (req, res) => {
  connection.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Erro ao testar conexão com o banco de dados:", err);
      res
        .status(500)
        .json({ message: "Erro ao testar conexão com o banco de dados." });
    } else {
      res.json({ message: "Conexão com o banco de dados bem-sucedida." });
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/times", timesRoutes);
app.use("/api/campeonatos", campeonatosRoutes);
app.use("/api/campeonatoslista", campeonatosListRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.send("Você está logado no sistema Meu Campeonato.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
