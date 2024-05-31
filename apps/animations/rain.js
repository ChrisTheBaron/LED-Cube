const Utils = require('../utils');

module.exports = class Rain {

    constructor() {

        // grid[y][x]
        //
        // makes the rendering easier
        this.grid = new Array(Utils.side_length * 6);

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(Utils.side_length).fill([10, 10, 10]);
        }

        // 2/3rds looks about right
        for (let i = 0; i < (Utils.side_length * Utils.side_length); i++) {
            const x = Math.floor(Math.random() * Utils.side_length);
            const y = Math.floor(Math.random() * Utils.side_length * 6);
            this.grid[y][x] = [0.5, 1, Math.random()];
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

        let ngrid = new Array(Utils.side_length * 6);

        for (let i = 0; i < ngrid.length; i++) {
            ngrid[i] = new Array(Utils.side_length).fill([10, 10, 10]);
        }

        for (let y = 0; y < Utils.side_length * 6; y++) {
            for (let x = 0; x < Utils.side_length; x++) {
                let [l, lv] = Utils.determineNextPixelAndVelocity({ x, y }, Utils.LEFT);
                let [ll, _] = Utils.determineNextPixelAndVelocity(l, Utils.determineLeftVelocity(lv));
                ngrid[ll.y][ll.x] = this.grid[y][x];
            }
        }

        for (let y = 0; y < Utils.side_length * 6; y++) {
            for (let x = 0; x < Utils.side_length; x++) {
                if (ngrid[y][x][1] != 1 && Math.random() > 0.975) {
                    ngrid[y][x] = [0.5, 1, Math.random()];
                }
            }
        }

        this.grid = ngrid;

    }

    render() {
        let colorMap = new Array(Utils.side_length * Utils.side_length * 6);

        let i = 0;
        for (let y of this.grid) {
            for (let x of y) {
                colorMap[i] = Utils.hslToRgb(...x);
                i++;
            }
        }

        return colorMap;
    }

}
