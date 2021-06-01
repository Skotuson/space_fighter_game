
function setCanvas(canvas, color) {
    canvas.width = screen.width * 0.5;
    canvas.height = screen.height * 0.88;
    canvas.style.background = color;
    canvas.style.position = 'absolute';
    canvas.style.left = "50%";
    canvas.style.marginLeft = `-${canvas.width * 0.5}px`
}

function redrawCanvas(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function manageBounds(player, canvas) {
    if (player.x < Math.abs(canvas.width - player.x)) {
        player.setX(canvas.width - player.size);
    }
    else {
        player.setX(0 + player.size);
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCircle(ctx, x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTriangle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size * 0.5, y);
    ctx.lineTo(x + size * 0.5, y);
    ctx.fill();
}

function drawTriangleDown(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + size);
    ctx.lineTo(x - size * 0.5, y);
    ctx.lineTo(x + size * 0.5, y);
    ctx.fill();
}

function selectRandomColor(colors) {
    return colors[randomInteger(0, colors.length - 1)];
}

function isBetween(start, end, value) {
    return value > start && value < end;
}

function predictCoordinates(spaceship, player) {
    return player.x + randomInteger(0, 500) * (randomInteger(-1, 1));
}




