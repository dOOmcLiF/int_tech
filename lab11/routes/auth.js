const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const { generateToken } = require("../utils/jwt");

// Регистрация
router.post("/register", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send("Имя или пароль отсутствуют");
  }

  let users = db.read("users");
  const userExists = users.some((u) => u.name === name);

  if (userExists) {
    return res.status(400).send("Пользователь уже существует");
  }

  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    password
  };

  users.push(newUser);
  db.write("users", users);

  const token = generateToken(newUser.id);
  let tokens = db.read("tokens");

  if (!Array.isArray(tokens)) tokens = [];
  tokens.push(token);
  db.write("tokens", tokens);

  res.send({ token });
});

// Логин
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send("Имя или пароль отсутствуют");
  }

  const users = db.read("users");
  const user = users.find((u) => u.name === name && u.password === password);

  if (!user) return res.status(401).send("Неверное имя или пароль");

  const token = generateToken(user.id);
  let tokens = db.read("tokens");

  if (!Array.isArray(tokens)) tokens = [];
  tokens.push(token);
  db.write("tokens", tokens);

  res.send({ token });
});

module.exports = router;