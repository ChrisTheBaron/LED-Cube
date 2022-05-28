const Utils = require('../utils');

module.exports = class Snake {

    constructor(terminate) {
        this.terminate = terminate;
        this.velocity = Utils.DOWN;
        this.body = [
            { x: Utils.side_length - 4, y: Utils.y0_for_segment(2) + 4 },
            { x: Utils.side_length - 5, y: Utils.y0_for_segment(2) + 4 },
            { x: Utils.side_length - 6, y: Utils.y0_for_segment(2) + 4 }
        ];
        this.food = this.placeFood();
        this.score = 0;
        this.alive = true;
    }

    input(dir) {
        switch (dir) {
            case "LEFT": this.left(); break;
            case "RIGHT": this.right(); break;
        }
    }

    loop() {
        if (!this.alive) {
            return;
        }
        let [nextPixel, nextVelocity] = Utils.determineNextPixelAndVelocity(this.body[this.body.length - 1], this.velocity);
        if (this.intersectsWithBody(nextPixel)) {
            this.alive = false;
            this.terminate("Your score was: " + this.score);
            return;
        } else if (nextPixel.x == this.food.x &&
            nextPixel.y == this.food.y) {
            this.score++;
            this.food = this.placeFood();
        } else {
            this.body.shift();
        }
        this.velocity = nextVelocity;
        this.body.push(nextPixel);
    }

    render() {
        const bodyColour = [255, 0, 0];
        const foodColour = [0, 255, 0];
        const backColour = [0, 0, 0];

        let colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill(backColour);

        colorMap[(this.food.x + (this.food.y * Utils.side_length))] = foodColour;

        for (let pos of this.body) {
            colorMap[(pos.x + (pos.y * Utils.side_length))] = bodyColour;
        }

        return colorMap;
    }

    left() { this.velocity = Utils.determineLeftVelocity(this.velocity) }

    right() { this.velocity = Utils.determineRightVelocity(this.velocity) }

    intersectsWithBody(pixel) {
        return this.body.some(b => b.x == pixel.x && b.y == pixel.y);
    }

    placeFood() {
        let food;
        do {
            food = {
                x: Utils.randomInt(0, Utils.side_length - 1),
                y: Utils.randomInt(0, (Utils.side_length * 6) - 1)
            };
        }
        while (this.intersectsWithBody(food));
        return food;
    }

}
