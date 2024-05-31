const Utils = require('../utils');

module.exports = class Sparkle {

    constructor() {
        this.colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill([10, 10, 10]);

        for (let i = 0; i < this.colorMap.length; i++) {
            this.colorMap[i] = [1, 1, Math.random() > 0.5 ? 1 : 0];
        }

        this.timer = 0;
    }

    input(data) {

    }

    loop(speed) {

        this.timer += speed / 10;

        if (this.timer < 1) {
            return;
        }
        this.timer = 0;

        for (let i = 0; i < this.colorMap.length; i++) {
            this.colorMap[i] = [1, 1, Math.random() > 0.5 ? 1 : 0];
        }
    }

    render() {
        return this.colorMap.map((x) => Utils.hslToRgb(...x));
    }

}
