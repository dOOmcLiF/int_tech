const { verifyToken } = require("../utils/jwt");
const db = require("../utils/db");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).send("Требуется токен");

  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).send("Неверный токен");

  let tokens;
  try {
    tokens = db.read("tokens");
  } catch (err) {
    console.error("Ошибка чтения токенов:", err);
    return res.status(500).send("Ошибка сервера");
  }

  // Убедимся, что tokens — это массив
  if (!Array.isArray(tokens)) {
    return res.status(403).send("Токен истёк");
  }

  // Проверяем наличие токена
  if (!tokens.includes(token)) {
    return res.status(403).send("Токен истёк");
  }

  req.userId = decoded.id;
  next();
};

module.exports = authMiddleware;