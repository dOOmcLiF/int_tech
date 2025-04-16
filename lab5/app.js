const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Главная', content: data.home });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'О нас', content: data.about });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Контакты', content: data.contact });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Наши сервисы', content: data.services });
});

app.get('/form', (req, res) => {
  res.render('form', { title: 'Подписаться на новости' });
});

app.post('/form', (req, res) => {
  const formData = req.body;
  const result = Object.entries(formData).map(([key, value]) => `${key}: ${value}`);
  res.send(`<h1>Form Data:</h1><ul>${result.map(item => `<li>${item}</li>`).join('')}</ul>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});