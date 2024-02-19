const Utils = require('../utils');
const LEDs = require('../leds');

module.exports = class RainbowIntersecting {

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
            let offsetX = (this.timeoffset + LEDs[i]["X"] + 1) % 1;
            let offsetY = (this.timeoffset + LEDs[i]["Y"] + 1) % 1;
            let offsetZ = (this.timeoffset + LEDs[i]["Z"] + 1) % 1;
            let colX = { h: offsetX, s: 1, l: 0.5 };
            let colY = { h: offsetY, s: 1, l: 0.5 };
            let colZ = { h: offsetZ, s: 1, l: 0.5 };
            let col = Utils.combineHSL(colX, colY, colZ);
            this.colorMap[i] = Utils.hslToRgb(col[0], 1, 0.5);
        }
        return this.colorMap;
    }

}
