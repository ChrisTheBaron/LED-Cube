class Rain {

    constructor() {

        // grid[y][x]
        //
        // makes the rendering easier
        this.grid = new Array(side_length * 6);

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(side_length).fill([0, 0, 0]);
        }

    }

    populate() {
        // 2/3rds looks about right
        for (let i = 0; i < (side_length * side_length); i++) {
            const x = Math.floor(Math.random() * side_length);
            const y = Math.floor(Math.random() * side_length * 6);
            this.grid[y][x] = [0.5, 1, Math.random()];
        }
    }

    iterate() {

        let ngrid = new Array(side_length * 6);

        for (let i = 0; i < ngrid.length; i++) {
            ngrid[i] = new Array(side_length).fill([0, 0, 0]);
        }

        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {
                let [l, lv] = determineNextPixelAndVelocity({ x, y }, LEFT);
                let [ll, _] = determineNextPixelAndVelocity(l, determineLeftVelocity(lv));
                ngrid[ll.y][ll.x] = this.grid[y][x];
            }
        }

        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {
                if (ngrid[y][x][1] != 1 && Math.random() > 0.975) {
                    ngrid[y][x] = [0.5, 1, Math.random()];
                }
            }
        }

        this.grid = ngrid;

    }

    render() {
        let colorMap = new Array(side_length * side_length * 6);

        let i = 0;
        for (let y of this.grid) {
            for (let x of y) {
                colorMap[i] = hslToRgb(...x);
                i++;
            }
        }

        return colorMap;
    }

}
