const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let drawingHistory = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.emit('load-history', drawingHistory);

    socket.on('draw', (data) => {
        drawingHistory.push(data); 
        socket.broadcast.emit('draw', data); 
    });

    socket.on('clear-canvas', () => {
        drawingHistory = [];
        io.emit('clear-canvas'); 
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});