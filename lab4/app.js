const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const users = require('./users.json').users;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else if (pathname === '/text') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Это текстовый ответ');
  } else if (pathname === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const jsonResponse = { message: 'Это JSON ответ' };
    res.end(JSON.stringify(jsonResponse));
  } else if (pathname === '/image') {
    const imagePath = path.join(__dirname, 'src/image.jpg');
    fs.createReadStream(imagePath).pipe(res);
  } else if (pathname === '/login') {
    const query = parsedUrl.query;
    const user = users.find(u => u.username === query.username && u.password === query.password);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Авторизация успешна');
    } else {
      res.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Ошибка авторизации');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Страница не найдена');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
