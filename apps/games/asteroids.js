const Utils = require('../utils');

const SHIP_SLOW_FACTOR = 6;
const ASTEROID_SLOW_FACTOR = 9;

const START_LIVES = 5;
const START_ROIDS = 6;

module.exports = class Asteroids {

    constructor(terminate) {

        this.terminate = terminate;

        this.shipmove = SHIP_SLOW_FACTOR;
        this.asteroidmove = ASTEROID_SLOW_FACTOR;

        this.life = START_LIVES;
        this.ship = { position: { x: Utils.side_length - 4, y: Utils.y0_for_segment(2) + 4 }, velocity: Utils.DOWN };
        this.asteroids = [];
        this.bullets = [];
        this.score = 0;

        this.alive = true;

        for (let i = 0; i < START_ROIDS; i++) {
            this.placeAsteroid();
        }
    }

    input(dir) {
        switch (dir) {
            case "LEFT": this.left(); break;
            case "RIGHT": this.right(); break;
            case "FIRE": this.fire(); break;
        }
    }

    loop() {

        let initCount = this.asteroids.length;

        if (--this.shipmove <= 0) {
            let [nextPixel, nextVelocity] = Utils.determineNextPixelAndVelocity(this.ship.position, this.ship.velocity);
            this.ship.velocity = nextVelocity;
            this.ship.position = nextPixel;
            this.shipmove = SHIP_SLOW_FACTOR;
        }

        for (let i = 0; i < this.bullets.length; i++) {
            let [nextBulletPixel, nextBulletVelocity] = Utils.determineNextPixelAndVelocity(this.bullets[i].position, this.bullets[i].velocity);
            this.bullets[i].position = nextBulletPixel;
            this.bullets[i].velocity = nextBulletVelocity;
        }

        if (--this.asteroidmove <= 0) {
            for (let i = 0; i < this.asteroids.length; i++) {
                let [nextRoidPixel, nextRoidVelocity] = Utils.determineNextPixelAndVelocity(this.asteroids[i].position, this.asteroids[i].velocity);
                this.asteroids[i].position = nextRoidPixel;
                this.asteroids[i].velocity = nextRoidVelocity;
            }
            this.asteroidmove = ASTEROID_SLOW_FACTOR;
        }

        for (let i = 0; i < this.asteroids.length; i++) {
            for (let j = 0; j < this.bullets.length; j++) {
                if (this.intersects(this.asteroids[i].position, this.bullets[j].position)) {
                    this.asteroids[i].flag = true;
                    this.bullets[j].flag = true;
                }
            }
        }

        if (this.asteroids.some(r => this.intersectsWithShip(r.position))) {
            if (--this.life <= 0) {
                this.alive = false;
                this.terminate("Your score was: " + this.score);
                return;
            }
        }

        this.asteroids = this.asteroids.filter(a => !a.flag);
        this.bullets = this.bullets.filter(b => !b.flag);

        let newCount = this.asteroids.length;

        let kill = initCount - newCount;

        this.score += kill;

        if (kill > 0) {
            for (let i = 0; i < 1 + Math.floor(Math.log(this.score + 1)); i++) {
                this.placeAsteroid();
            }
        }
    }

    placeAsteroid() {
        let position;
        do {
            position = {
                x: Utils.randomInt(0, Utils.side_length - 1),
                y: Utils.randomInt(0, (Utils.side_length * 6) - 1)
            };
        }
        while (this.intersectsWithShip(position) ||
        this.asteroids.some(r => this.intersects(position, r)) ||
            this.bullets.some(r => this.intersects(position, r)));
        let velocity = Utils.randomInt(0, 3);
        this.asteroids.push({ position, velocity });
    }

    render() {

        const shipColour = [255, 255, 255];
        const roidColour = [0, 255, 0];
        const bulletColour = [255, 0, 0];
        const backColour = [10, 10, 10];

        let colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill(backColour);

        //now for some fun
        const forwards = Utils.determineNextPixelAndVelocity(this.ship.position, this.ship.velocity);
        const leftRear = Utils.determineNextPixelAndVelocity(this.ship.position, Utils.determineLeftVelocity(this.ship.velocity));
        const rightRear = Utils.determineNextPixelAndVelocity(this.ship.position, Utils.determineRightVelocity(this.ship.velocity));
        colorMap[(leftRear[0].x + (leftRear[0].y * Utils.side_length))] = shipColour;
        colorMap[(rightRear[0].x + (rightRear[0].y * Utils.side_length))] = shipColour;
        colorMap[(forwards[0].x + (forwards[0].y * Utils.side_length))] = shipColour;

        for (let roid of this.asteroids) {
            colorMap[(roid.position.x + (roid.position.y * Utils.side_length))] = roidColour;
        }

        for (let bullet of this.bullets) {
            colorMap[(bullet.position.x + (bullet.position.y * Utils.side_length))] = bulletColour;
        }

        return colorMap;

    }

    intersectsWithShip(pixel) {
        return this.intersects(this.ship.position, pixel);
    }

    intersects(a, b) {
        return a.x == b.x && a.y == b.y;
    }

    fire() {
        let [nextPosition, nextVelocity] = Utils.determineNextPixelAndVelocity(this.ship.position, this.ship.velocity);
        if (!this.bullets.some(b => this.intersects(b.position, nextPosition))) {
            console.log("fire");
            this.bullets.push({ position: nextPosition, velocity: nextVelocity });
        }
    }

    left() { this.ship.velocity = Utils.determineLeftVelocity(this.ship.velocity) }

    right() { this.ship.velocity = Utils.determineRightVelocity(this.ship.velocity) }

}
