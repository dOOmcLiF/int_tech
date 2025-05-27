const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// ✅ Сначала подключаем db
const db = require("./utils/db");

const app = express();

// Парсим JSON-тело запросов
app.use(bodyParser.json());

// Подключаем маршруты авторизации
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Подключаем middleware
const authMiddleware = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

// Создаем файлы, если их нет
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

if (!fs.existsSync(path.join(__dirname, "data/users.json"))) {
  fs.writeFileSync(path.join(__dirname, "data/users.json"), "[]");
}
if (!fs.existsSync(path.join(__dirname, "data/tokens.json"))) {
  fs.writeFileSync(path.join(__dirname, "data/tokens.json"), "[]");
}

// Статические файлы
app.use(express.static(path.join(__dirname, "public")));

// Защищаем все /api/* маршруты
app.use("/api", rateLimiter, authMiddleware);

// Все маршруты пользователей
app.get("/api/users", function (req, res) {
  const users = db.read("users");
  res.send(users);
});

app.get("/api/users/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const users = db.read("users");
  const user = users.find((u) => u.id === id);
  if (user) res.send(user);
  else res.status(404).send();
});

app.post("/api/users", function (req, res) {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).send("Данные некорректны");

  const users = db.read("users");
  const newId = Math.max(...users.map((u) => u.id), 0) + 1;
  const newUser = { id: newId, name, age };
  users.push(newUser);
  db.write("users", users);
  res.send(newUser);
});

app.delete("/api/users/:id", function (req, res) {
  const id = parseInt(req.params.id);
  let users = db.read("users");
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).send();

  const deletedUser = users.splice(index, 1)[0];
  db.write("users", users);
  res.send(deletedUser);
});

app.put("/api/users", function (req, res) {
  const { id, name, age } = req.body;
  if (!id || !name || !age) return res.status(400).send("Данные некорректны");

  let users = db.read("users");
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).send();

  user.name = name;
  user.age = age;
  db.write("users", users);
  res.send(user);
});

app.get("/api/users/search", function (req, res) {
  const query = req.query.q?.toLowerCase() || "";
  const users = db.read("users").filter((u) =>
    u.name.toLowerCase().includes(query)
  );
  res.send(users);
});

app.listen(3000, () => {
  console.log("Сервер ожидает подключения на порту 3000...");
});