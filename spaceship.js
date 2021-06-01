
class Spaceship {
    constructor(x, y, size, speed, color, orientation) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.bullets = [];
        this.sparks = [];
        this.damage = 0;
        this.orientation = orientation;
    }

    drawBody(ctx) {
        drawTriangle(ctx, this.x, this.y, this.size * this.orientation, this.color);
    }

    drawPropulsion(ctx) {
        drawTriangle(ctx, this.x, this.y, this.size * 0.1 * randomInteger(1, 3) * (-this.orientation), selectRandomColor(['yellow', 'orange', 'red']));
    }

    drawBullets(canvas, ctx, colors) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].y < 0 || this.bullets[i].y > canvas.height) {
                this.bullets.splice(i, 1);
            }
            if (this.bullets.length > 0) {
                this.bullets[i].drawBullet(ctx, selectRandomColor(colors));
                this.bullets[i].travel(this.orientation);
            }
        }
    }

    follow(coords) {
        if (Math.abs(this.x - coords) < this.speed) {
            this.x = coords;
            return;
        }
        if (this.x == coords) {
            return;
        }
        else if (this.x > coords) {
            this.x -= this.speed;
        }
        else if (this.x < coords) {
            this.x += this.speed;
        }
    }

    move(distance) {
        this.x += distance;
    }

    damageShip() {
        this.damage++;
    }

    setX(x) {
        this.x = x;
    }

    isOutOfBounds(lowerBound, upperBound) {
        let base = this.size * 0.5;
        return (this.x - base <= lowerBound) || (this.x + base >= upperBound);
    }

    isColliding(object) {
        return (this.y - this.size < object.y) && isBetween(object.x - this.size, object.x + this.size, this.x);
    }

    checkCollision(group, takeDamage) {
        for (let i = 0; i < group.length; i++) {
            if (this.isColliding(group[i])) {
                group.splice(i, 1);
                if (takeDamage)
                    this.damageShip();
            }
        }
    }

    checkBulletCollision(group) {
        if (this.bullets.length > 0) {
            for (let i = 0; i < this.bullets.length; i++) {
                for (let j = 0; j < group.length; j++) {
                    if (this.bullets[i].targetHit(group[j])) {
                        group.splice(j, 1);
                    }

                }
            }
        }
    }

    checkIfSpaceshipHit(spaceship) {
        if (this.bullets.length > 0) {
            for (let i = 0; i < this.bullets.length; i++) {
                if (this.bullets[i].targetHit(spaceship)) {
                    this.bullets.splice(i, 1);
                    spaceship.damageShip();
                }
            }
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.x, this.y - this.size * this.orientation, 4, 10));
    }

}

class Bullet {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    drawBullet(ctx, color) {
        drawCircle(ctx, this.x, this.y, this.size, color);
    }

    travel(orientation) {
        this.y -= this.speed * orientation;
    }

    targetHit(object) {
        return (this.y - this.size < object.y) && isBetween(object.x - object.size, object.x + object.size, this.x);
    }
}

class Rocket {

}

class Spark {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }
    drawSpark(ctx) {

    }

    travel(orientation) {

    }
}