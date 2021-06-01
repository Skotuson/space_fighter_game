class Space {
    constructor() {
        this.stars = [];
        this.asteroids = [];
    }

    addStar(star) {
        this.stars.push(star);
    }

    addAsteroid(asteroid) {
        this.asteroids.push(asteroid);
    }

    drawStars(canvas, ctx) {
        for (let i = 0; i < this.stars.length; i++) {
            if (this.stars[i].y > canvas.height) {
                this.stars.splice(i, 1);
                continue;
            }
            this.stars[i].travel();
            this.stars[i].drawStar(ctx);
        }
    }

    drawAsteroids(canvas, ctx) {
        for (let i = 0; i < this.asteroids.length; i++) {
            if (this.asteroids[i].y > canvas.height) {
                this.asteroids.splice(i, 1);
                continue;
            }
            this.asteroids[i].travel();
            this.asteroids[i].drawAsteroid(ctx);
        }
    }

    canGenerateStars() {
        return this.stars.length <= 75;
    }

    canGenerateAsteroids() {
        return this.asteroids.length <= 5;
    }

}

class Asteroid {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    drawAsteroid(ctx) {
        drawCircle(ctx, this.x, this.y - 8, this.size, selectRandomColor(['yellow', 'orange']));
        drawCircle(ctx, this.x, this.y, this.size, 'grey');
    }

    travel() {
        this.y += this.speed;
    }
}

class Star {
    constructor(x, y, w, l, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.l = l;
        this.speed = speed;
    }

    drawStar(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.w, this.l);
    }

    travel() {
        this.y += this.speed;
    }
}

