class Sparkle {

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
            this.grid[y][x] = [Math.random(), 1, 0.5];
        }
    }

    iterate(){
        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {
                if(this.grid[y][x][2] > 0){
                    this.grid[y][x][2] = Math.max(this.grid[y][x][2] - 0.05, 0);
                } else if(Math.random() > 0.6){
                    this.grid[y][x] = [Math.random(), 1, 0.5];
                } else {
                    this.grid[y][x] = [0, 0, 0];
                }
            }
        }
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
