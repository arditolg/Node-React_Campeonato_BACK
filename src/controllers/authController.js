const connection = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: `Senha incorreta. Senha digitada: ${password}` });
      }

      const user = results[0];

      const token = jwt.sign({ id: user.id }, "seu_segredo", {
        expiresIn: "1h",
      });

      res.json({ token });
    }
  );
};
