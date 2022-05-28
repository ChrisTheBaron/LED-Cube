class Pipes {

    constructor() {
        this.colorMap = new Array(side_length * side_length * 6).fill([0, 0, 0]);
        this.pipes = [];
    }

    populate() {
        for (let i = 0; i < 6; i++) {
            this.pipes.push({
                body: [{ x: Math.floor(Math.random() * side_length), y: Math.floor(Math.random() * side_length * 6) }],
                colour: hslToRgb(Math.random(), 1, 0.5),
                dir: Math.floor(Math.random() * 4),
                alive: true
            });
        }
    }

    iterate() {
        for (let pipe of this.pipes) {
            if (pipe.body.length > 10 && Math.random() > 0.95) {
                pipe.alive = false;
            } else {
                if (Math.random() > 0.8) {
                    pipe.dir = Math.random() > 0.5 ? determineLeftVelocity(pipe.dir) : determineRightVelocity(pipe.dir);
                }
                let next = determineNextPixelAndVelocity(pipe.body[pipe.body.length - 1], pipe.dir);
                pipe.body.push(next[0]);
                pipe.dir = next[1];
            }
        }
        this.pipes = this.pipes.filter(p => p.alive);
        for (let i = 0; i < 6 - this.pipes.length; i++) {
            this.pipes.push({
                body: [{ x: Math.floor(Math.random() * side_length), y: Math.floor(Math.random() * side_length * 6) }],
                colour: hslToRgb(Math.random(), 1, 0.5),
                dir: Math.floor(Math.random() * 4),
                alive: true
            });
        }
    }

    render() {
        for (let pipe of this.pipes) {
            for (let pos of pipe.body) {
                this.colorMap[(pos.x + (pos.y * side_length))] = pipe.colour;
            }
        }
        return this.colorMap;
    }

}
