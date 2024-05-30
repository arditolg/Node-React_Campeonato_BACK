const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Acesso negado." });

  try {
    const decoded = jwt.verify(token, "seu_segredo");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido." });
  }
};
