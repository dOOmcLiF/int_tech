const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Хранение истории действий пользователей
let drawingHistory = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Отправляем историю рисунка новому клиенту
    socket.emit('load-history', drawingHistory);

    // Обработка новых действий пользователя
    socket.on('draw', (data) => {
        drawingHistory.push(data); // Сохраняем действие в истории
        socket.broadcast.emit('draw', data); // Передаем действие другим клиентам
    });

    // Обработка отключения пользователя
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});