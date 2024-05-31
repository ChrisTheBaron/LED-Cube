const Utils = require('../utils');

module.exports = class Pipes {

    constructor() {

        this.colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill([10, 10, 10]);
        this.pipes = [];

        for (let i = 0; i < 6; i++) {
            this.pipes.push({
                body: [{ x: Math.floor(Math.random() * Utils.side_length), y: Math.floor(Math.random() * Utils.side_length * 6) }],
                colour: Utils.hslToRgb(Math.random(), 1, 0.5),
                dir: Math.floor(Math.random() * 4),
                alive: true
            });
        }

        this.timer = 0;

    }

    input() {

    }

    loop(speed) {

        this.timer += speed;

        if (this.timer < 1) {
            return;
        }
        this.timer = 0;

        for (let pipe of this.pipes) {
            if (pipe.body.length > 10 && Math.random() > 0.95) {
                pipe.alive = false;
            } else {
                if (Math.random() > 0.8) {
                    pipe.dir = Math.random() > 0.5 ? Utils.determineLeftVelocity(pipe.dir) : Utils.determineRightVelocity(pipe.dir);
                }
                let next = Utils.determineNextPixelAndVelocity(pipe.body[pipe.body.length - 1], pipe.dir);
                pipe.body.push(next[0]);
                pipe.dir = next[1];
            }
        }
        this.pipes = this.pipes.filter(p => p.alive);
        for (let i = 0; i < 6 - this.pipes.length; i++) {
            this.pipes.push({
                body: [{ x: Math.floor(Math.random() * Utils.side_length), y: Math.floor(Math.random() * Utils.side_length * 6) }],
                colour: Utils.hslToRgb(Math.random(), 1, 0.5),
                dir: Math.floor(Math.random() * 4),
                alive: true
            });
        }
    }

    render() {
        for (let pipe of this.pipes) {
            for (let pos of pipe.body) {
                this.colorMap[(pos.x + (pos.y * Utils.side_length))] = pipe.colour;
            }
        }
        return this.colorMap;
    }

}
