const Utils = require('../utils');

module.exports = class GameOfLife {

    constructor() {

        // grid[y][x]
        // 
        // makes the rendering easier
        this.grid = new Array(Utils.side_length * 6);

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(Utils.side_length).fill(false);
        }

        // 2/3rds looks about right
        for (let i = 0; i < (Utils.side_length * Utils.side_length * 2); i++) {
            const x = Math.floor(Math.random() * Utils.side_length);
            const y = Math.floor(Math.random() * Utils.side_length * 6);
            this.grid[y][x] = true;
        }

        this.timer = 0;
    }

    input() {

    }

    loop(speed) {

        this.timer += speed / 10;

        if (this.timer < 1) {
            return;
        }
        this.timer = 0;

        var ngrid = new Array(Utils.side_length * 6);

        for (let i = 0; i < ngrid.length; i++) {
            ngrid[i] = new Array(Utils.side_length).fill(false);
        }

        for (let y = 0; y < Utils.side_length * 6; y++) {
            for (let x = 0; x < Utils.side_length; x++) {

                let [l, lv] = Utils.determineNextPixelAndVelocity({ x, y }, Utils.LEFT);
                let [r, rv] = Utils.determineNextPixelAndVelocity({ x, y }, Utils.RIGHT);
                let [u, uv] = Utils.determineNextPixelAndVelocity({ x, y }, Utils.UP);
                let [d, dv] = Utils.determineNextPixelAndVelocity({ x, y }, Utils.DOWN);

                let [ll, llv] = Utils.determineNextPixelAndVelocity(l, Utils.determineLeftVelocity(lv));
                let [rl, rlv] = Utils.determineNextPixelAndVelocity(r, Utils.determineLeftVelocity(rv));
                let [ul, ulv] = Utils.determineNextPixelAndVelocity(u, Utils.determineLeftVelocity(uv));
                let [dl, dlv] = Utils.determineNextPixelAndVelocity(d, Utils.determineLeftVelocity(dv));

                let total =
                    (this.grid[l.y][l.x] ? 1 : 0) +
                    (this.grid[r.y][r.x] ? 1 : 0) +
                    (this.grid[d.y][d.x] ? 1 : 0) +
                    (this.grid[u.y][u.x] ? 1 : 0) +
                    (this.grid[ll.y][ll.x] ? 1 : 0) +
                    (this.grid[rl.y][rl.x] ? 1 : 0) +
                    (this.grid[dl.y][dl.x] ? 1 : 0) +
                    (this.grid[ul.y][ul.x] ? 1 : 0);

                ngrid[y][x] = this.grid[y][x];

                if (this.grid[y][x] && (total < 2 || total > 3)) {
                    ngrid[y][x] = false;
                } else if (this.grid[y][x] != true && total == 3) {
                    ngrid[y][x] = true;
                }
            }
        }

        this.grid = ngrid;

    }

    render() {

        const aliveColour = [255, 255, 255];
        const deadColour = [0, 0, 0];

        let colorMap = new Array(Utils.side_length * Utils.side_length * 6);

        let i = 0;
        for (let y of this.grid) {
            for (let x of y) {
                colorMap[i] = x ? aliveColour : deadColour
                i++;
            }
        }

        return colorMap;

    }

}
