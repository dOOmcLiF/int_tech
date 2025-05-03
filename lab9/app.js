const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/bulletinBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Модель объявления
const Post = mongoose.model('Post', {
  title: String,
  text: String,
  date: { type: Date, default: Date.now }
});

// Настройки шаблонизатора
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Главная страница
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.render('index', { posts, search: false });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Добавление объявления
app.post('/', async (req, res) => {
  const { title, text } = req.body;
  await new Post({ title, text }).save();
  res.redirect('/');
});

// Удаление объявления
app.post('/delete/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Поиск
app.get('/search', async (req, res) => {
  const query = req.query.q;
  const posts = await Post.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } });
  res.render('index', { posts, search: true, query });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});