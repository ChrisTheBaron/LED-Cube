class RainbowMoving {

    constructor() {
        this.colorMap = new Array(side_length * side_length * 6).fill([255, 255, 255]);
        this.timeoffset = 0;
    }

    populate() {
    }

    iterate() {
        this.timeoffset = (this.timeoffset + 0.01) % 1;
    }

    render() {
        for (let i = 0; i < this.colorMap.length; i++) {
            let positionoffset = window.ledPositions[i]["Y"];
            positionoffset += 1;
            let offset = (this.timeoffset + positionoffset) % 1;
            this.colorMap[i] = hslToRgb(offset, 1, 0.5);
        }
        return this.colorMap;
    }

}
