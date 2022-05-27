class Sparkle {

    constructor(){
        this.colorMap = new Array(side_length * side_length * 6).fill([0, 0, 0]);
    }

    populate(){
         // 2/3rds looks about right
        for (let i = 0; i < (this.colorMap.length * (2/3)); i++) {
            const pos = Math.floor(Math.random() * this.colorMap.length);
            this.colorMap[pos] = [Math.random(), 1, 0.5];
        }
    }

    iterate(){
        for (let i = 0; i < this.colorMap.length; i++) {
            if(this.colorMap[i][2] > 0){
                this.colorMap[i][2] = Math.max(this.colorMap[i][2] - 0.025, 0);
            } else if(Math.random() > 0.9){
                this.colorMap[i] = [Math.random(), 1, 0.5];
            } else {
                this.colorMap[i] = [0, 0, 0];
            }
        }
    }

    render(){
        return this.colorMap.map((x) => hslToRgb(...x));
    }

}
