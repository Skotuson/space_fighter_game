const canvas = document.getElementById('canvas');
setCanvas(canvas, "black");
const ctx = canvas.getContext('2d');

let player = new Spaceship(canvas.width / 2, canvas.height - 75, 50, 7, '#190019', 1);
let pirate = new Spaceship(canvas.width / 2, 75, 55, 3, 'orange', -1);
let pirateCoords = canvas.width / 2;
let space = new Space();
let coords = canvas.width / 2;
let timer = 0;

canvas.addEventListener('mousemove', e => {
    coords = e.clientX - canvas.offsetLeft;
})

function draw() {
    redrawCanvas(ctx);

    if (space.canGenerateStars()) {
        space.addStar(new Star(randomInteger(0, canvas.width), randomInteger(-canvas.height, 0), randomInteger(5, 7), randomInteger(5, 7), 5));
    }
    space.drawStars(canvas, ctx);

    if (space.canGenerateAsteroids()) {
        space.addAsteroid(new Asteroid(randomInteger(0, canvas.width), randomInteger(-canvas.height, 0), randomInteger(15, 20), randomInteger(10, 15)));
    }
    space.drawAsteroids(canvas, ctx);

    pirate.drawBody(ctx);
    pirate.drawPropulsion(ctx);
    pirate.checkCollision(space.asteroids, false);
    if (timer == 30) {
        pirateCoords = predictCoordinates(pirate, player);
        pirate.shoot();

        player.shoot();

        timer = 0;
    }
    pirate.follow(pirateCoords);
    pirate.drawBullets(canvas, ctx, ["blue"]);
    pirate.checkIfSpaceshipHit(player);
    timer++;

    player.follow(coords);
    if (player.isOutOfBounds(0, canvas.width)) {
        manageBounds(player, canvas);
    }
    player.drawBody(ctx);
    player.drawPropulsion(ctx);
    player.drawBullets(canvas, ctx, ["green", "lime"]);
    player.checkCollision(space.asteroids, true);
    player.checkBulletCollision(space.asteroids);
    player.checkIfSpaceshipHit(pirate);

    pirate.drawHealthBar(ctx, 10, 10, 50);
    player.drawHealthBar(ctx, 10, canvas.height - 60, 50);

    let animation = window.requestAnimationFrame(draw);

    if (player.isDestroyed() || pirate.isDestroyed()) {
        window.cancelAnimationFrame(animation);
    }

}

draw();





