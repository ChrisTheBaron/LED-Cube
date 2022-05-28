class Rain {

    constructor(){

        // grid[y][x]
        //
        // makes the rendering easier
        this.grid = new Array(side_length * 6);

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(side_length).fill([0, 0, 0]);
        }

    }

    populate(){
        // 2/3rds looks about right
        for (let i = 0; i < (side_length * side_length * 2); i++) {
            const x = Math.floor(Math.random() * side_length);
            const y = Math.floor(Math.random() * side_length * 6);
            this.grid[y][x] = [0.5, 1, Math.random()];
        }
    }

    iterate(){

        let ngrid = new Array(side_length * 6);

        for (let i = 0; i < ngrid.length; i++) {
            ngrid[i] = new Array(side_length).fill([0,0,0]);
        }

        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {

                let [l, lv] = determineNextPixelAndVelocity({ x, y }, LEFT);
                let [r, rv] = determineNextPixelAndVelocity({ x, y }, RIGHT);
                let [u, uv] = determineNextPixelAndVelocity({ x, y }, UP);
                let [d, dv] = determineNextPixelAndVelocity({ x, y }, DOWN);

                let [ll, llv] = determineNextPixelAndVelocity(l, determineLeftVelocity(lv));
                let [rl, rlv] = determineNextPixelAndVelocity(r, determineLeftVelocity(rv));
                let [ul, ulv] = determineNextPixelAndVelocity(u, determineLeftVelocity(uv));
                let [dl, dlv] = determineNextPixelAndVelocity(d, determineLeftVelocity(dv));

                let height = this.getHeight(x,y);

                let total =
                    (this.getHeight(ll.x, ll.y) > height ? this.grid[ll.y][ll.x][2] : 0) +
                    (this.getHeight(rl.x, rl.y) > height ? this.grid[rl.y][rl.x][2] : 0) +
                    (this.getHeight(dl.x, dl.y) > height ? this.grid[dl.y][dl.x][2] : 0) +
                    (this.getHeight(ul.x, ul.y) > height ? this.grid[ul.y][ul.x][2] : 0);

                ngrid[y][x] = this.grid[y][x];
                ngrid[y][x][2] = Math.min(total, 1);

            }
        }

        this.grid = ngrid;

    }

    getHeight(x, y){
        return window.ledPositions[y * side_length + x]["Y"];
    }

    render(){
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
