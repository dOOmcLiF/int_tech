const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const shapes = [
    ["circle", 50, 50, 10, getRandomColor()],
    ["square", 150, 50, 25, getRandomColor()],
    ["ellipse", 200, 200, 30, 40, getRandomColor()],
    ["bezier", 300, 300, 50, 100, 150, 200, getRandomColor()]
];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawSquare(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

function drawEllipse(x, y, radiusX, radiusY, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawBezier(x, y, cp1x, cp1y, cp2x, cp2y, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + 100, y);
    ctx.stroke();
}

function drawShapes(shapes) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        switch (shape[0]) {
            case "circle":
                drawCircle(shape[1], shape[2], shape[3], shape[4]);
                break;
            case "square":
                drawSquare(shape[1], shape[2], shape[3], shape[4]);
                break;
            case "ellipse":
                drawEllipse(shape[1], shape[2], shape[3], shape[4], shape[5]);
                break;
            case "bezier":
                drawBezier(shape[1], shape[2], shape[3], shape[4], shape[5], shape[6], shape[7]);
                break;
        }
    });
}

let angle = 0;
function animate() {
    angle += 0.01;
    const animatedShapes = shapes.map(shape => {
        switch (shape[0]) {
            case "circle":
                return ["circle", shape[1] + 20 * Math.cos(angle), shape[2] + 20 * Math.sin(angle), shape[3], shape[4]];
            case "square":
                return ["square", shape[1] + 10 * Math.cos(angle), shape[2] + 10 * Math.sin(angle), shape[3], shape[4]];
            case "ellipse":
                return ["ellipse", shape[1] + 15 * Math.cos(angle), shape[2] + 15 * Math.sin(angle), shape[3], shape[4], shape[5]];
            default:
                return shape;
        }
    });
    drawShapes(animatedShapes);
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    shapes.push(["circle", x, y, 10]);
});

drawShapes(shapes);
animate();
