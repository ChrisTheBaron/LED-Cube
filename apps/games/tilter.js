const LEDs = require('../leds');
const Utils = require('../utils');

module.exports = class Tilter {

    constructor() {
        this.azimuthal = 0;
        this.polar = 0;

        this.colorMap = new Array(Utils.side_length * Utils.side_length * 6).fill([255, 255, 255]);
    }

    input(dir) {
        this.azimuthal = dir.azimuthal;
        this.polar = dir.polar;
    }

    loop() {

    }

    render() {
        let min = Infinity;
        let max = 0;

        for (let i = 0; i < this.colorMap.length; i++) {

            //LED[A] => [ -PI, PI ]
            //LED[P] => [ -PI/2, PI/2 ]

            //this.azimuthal => [ -PI, PI ]
            //this.polar => [ 0, PI ]

            let boundedDistance = haversineDistance(LEDs[i]["P"], LEDs[i]["A"], this.polar - (Math.PI / 2), -this.azimuthal) / Math.PI;

            min = Math.min(min, boundedDistance);
            max = Math.max(max, boundedDistance);

            let l = boundedDistance < 0.05 ? 1 : 0;

            this.colorMap[i] = Utils.hslToRgb(1, 0, l);
        }

        console.log(min, max);

        return this.colorMap;
    }

}

//in radians
function haversineDistance(lat1, lon1, lat2, lon2) {
    const φ1 = lat1;
    const φ2 = lat2;
    const Δφ = (lat2 - lat1);
    const Δλ = (lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c;
}