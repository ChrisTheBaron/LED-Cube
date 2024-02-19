const Utils = require('../utils');
const LEDs = require('../leds');
const Perlin = require('../perlin');

module.exports = class MonochromeNoise {

    constructor() {
        this.colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill([255, 255, 255]);
        this.timeoffset = 0;
        Perlin.noise.seed(Math.random());
    }

    input(data) {

    }

    loop(speed) {
        this.timeoffset = (this.timeoffset + (0.005 * speed)) % 1;
    }

    render() {
        for (let i = 0; i < this.colorMap.length; i++) {
            this.colorMap[i] = Utils.hslToRgb(this.timeoffset, 1, Math.pow(Perlin.noise.simplex3(
                LEDs[i]["X"] + Math.sin(this.timeoffset * 2 * Math.PI),
                LEDs[i]["Y"] + Math.cos(this.timeoffset * 2 * Math.PI),
                LEDs[i]["Z"] + Math.cos(this.timeoffset * 2 * Math.PI + (Math.PI / 2)),
            ) / 2 + 0.5, 2));
        }
        return this.colorMap;
    }

}
