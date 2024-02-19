const Utils = require('../utils');
const LEDs = require('../leds');

module.exports = class RainbowMoving {

    constructor() {
        this.colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill([255, 255, 255]);
        this.timeoffset = 0;
    }

    input(data) {

    }

    loop(speed) {
        this.timeoffset = (this.timeoffset + (0.02 * speed)) % 1;
    }

    render() {
        for (let i = 0; i < this.colorMap.length; i++) {
            let positionoffset = LEDs[i]["Y"];
            positionoffset += 1;
            let offset = (this.timeoffset + positionoffset) % 1;
            this.colorMap[i] = Utils.hslToRgb(offset, 1, 0.5);
        }
        return this.colorMap;
    }

}
