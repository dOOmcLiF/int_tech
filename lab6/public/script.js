const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');

let currentColor = '#000000';
let isDrawing = false;

const socket = io();

socket.on('load-history', (history) => {
    history.forEach((action) => {
        drawLine(action);
    });
});

socket.on('draw', (data) => {
    drawLine(data);
});

socket.on('clear-canvas', () => {
    clearCanvas();
});

function drawLine({ startX, startY, endX, endY, color }) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const { offsetX, offsetY } = e;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const { offsetX, offsetY } = e;
        const startX = ctx.lastX || offsetX;
        const startY = ctx.lastY || offsetY;

        drawLine({ startX, startY, endX: offsetX, endY: offsetY, color: currentColor });
        socket.emit('draw', { startX, startY, endX: offsetX, endY: offsetY, color: currentColor });

        ctx.lastX = offsetX;
        ctx.lastY = offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    delete ctx.lastX;
    delete ctx.lastY;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

clearButton.addEventListener('click', () => {
    clearCanvas();
    socket.emit('clear-canvas');
});