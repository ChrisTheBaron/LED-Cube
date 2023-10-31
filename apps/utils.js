module.exports = class Utils {

    static side_length = 24;

    static UP = 0;
    static RIGHT = 1;
    static DOWN = 2;
    static LEFT = 3;

    /**
     * https://stackoverflow.com/a/9493060
     *
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    static hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    /**
     * 
     * @return {Array}
     */
    static combineHSL(...colours) {
        let x = 0, y = 0, z = 0;
        for (let col of colours) {
            x += Math.cos(col.h * 2 * Math.PI) * col.s;
            y += Math.sin(col.h * 2 * Math.PI) * col.s;
            z += col.l;
        }
        return [
            (Math.atan2(y, x) / (2 * Math.PI)) + 0.5,
            Math.sqrt(x * x + y * y) / colours.length,
            z / colours.length
        ];
    }

    async sleep(int) {
        return new Promise((resolve) => setTimeout(resolve, int));
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static determineLeftVelocity(velocity) {
        if (--velocity < Utils.UP) velocity = Utils.LEFT;
        return velocity;
    }

    static determineRightVelocity(velocity) {
        if (++velocity > Utils.LEFT) velocity = Utils.UP;
        return velocity;
    }

    static y0_for_segment(segment) {
        return Utils.side_length * segment;
    }

    static determineNextPixelAndVelocity(currentPixel, currentVelocity) {
        const currentSegment = Utils.determineCurrentSegment(currentPixel);
        switch (currentSegment) {
            case 0:
                return Utils.segment0(currentPixel, currentVelocity);
            case 1:
                return Utils.segment1(currentPixel, currentVelocity);
            case 2:
                return Utils.segment2(currentPixel, currentVelocity);
            case 3:
                return Utils.segment3(currentPixel, currentVelocity);
            case 4:
                return Utils.segment4(currentPixel, currentVelocity);
            case 5:
                return Utils.segment5(currentPixel, currentVelocity);
            default:
                throw new Error(`Out of bounds! ${currentPixel.x} ${currentPixel.y}`);
        }
    }

    static handleNormalVelocity(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.UP:
                return [{ x: currentPixel.x, y: currentPixel.y - 1 }, Utils.UP];
            case Utils.RIGHT:
                return [{ x: currentPixel.x + 1, y: currentPixel.y }, Utils.RIGHT];
            case Utils.DOWN:
                return [{ x: currentPixel.x, y: currentPixel.y + 1 }, Utils.DOWN];
            case Utils.LEFT:
                return [{ x: currentPixel.x - 1, y: currentPixel.y }, Utils.LEFT];
        }
    }

    static segment0(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.UP:
                if (currentPixel.y <= 0) {
                    return [{ x: Utils.side_length - 1, y: Utils.y0_for_segment(5) - currentPixel.x - 1 }, Utils.LEFT];
                }
                break;
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: Utils.side_length - currentPixel.y - 1, y: Utils.y0_for_segment(2) }, Utils.DOWN];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.side_length - 1, y: Utils.y0_for_segment(5) + currentPixel.y }, Utils.LEFT];
                }
                break;
            case Utils.DOWN:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static segment1(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.DOWN:
                if (currentPixel.y >= Utils.y0_for_segment(2) - 1) {
                    return [{ x: 0, y: Utils.y0_for_segment(4) - currentPixel.x - 1 }, Utils.RIGHT];
                }
                break;
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: 0, y: currentPixel.y + Utils.side_length }, Utils.RIGHT];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.y0_for_segment(2) - currentPixel.y - 1, y: Utils.y0_for_segment(6) - 1 }, Utils.UP];
                }
                break;
            case Utils.UP:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static segment2(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.UP:
                if (currentPixel.y <= Utils.y0_for_segment(2)) {
                    return [{ x: Utils.side_length - 1, y: Utils.side_length - currentPixel.x - 1 }, Utils.LEFT];
                }
                break;
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: Utils.y0_for_segment(3) - currentPixel.y - 1, y: Utils.y0_for_segment(4) }, Utils.DOWN];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.side_length - 1, y: currentPixel.y - Utils.side_length }, Utils.LEFT];
                }
                break;
            case Utils.DOWN:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static segment3(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: 0, y: currentPixel.y + Utils.side_length }, Utils.RIGHT];
                }
                break;
            case Utils.DOWN:
                if (currentPixel.y >= Utils.y0_for_segment(4) - 1) {
                    return [{ x: 0, y: Utils.y0_for_segment(6) - currentPixel.x - 1 }, Utils.RIGHT];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.y0_for_segment(4) - currentPixel.y - 1, y: Utils.y0_for_segment(2) - 1 }, Utils.UP];
                }
                break;
            case Utils.UP:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static segment4(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.UP:
                if (currentPixel.y <= Utils.y0_for_segment(4)) {
                    return [{ x: Utils.side_length - 1, y: Utils.y0_for_segment(3) - currentPixel.x - 1 }, Utils.LEFT];
                }
                break;
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: Utils.y0_for_segment(5) - currentPixel.y - 1, y: 0 }, Utils.DOWN];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.side_length - 1, y: currentPixel.y - Utils.side_length }, Utils.LEFT];
                }
                break;
            case Utils.DOWN:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static segment5(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case Utils.RIGHT:
                if (currentPixel.x >= Utils.side_length - 1) {
                    return [{ x: 0, y: currentPixel.y - Utils.y0_for_segment(5) }, Utils.RIGHT];
                }
                break;
            case Utils.DOWN:
                if (currentPixel.y >= Utils.y0_for_segment(6) - 1) {
                    return [{ x: 0, y: Utils.y0_for_segment(2) - currentPixel.x - 1 }, Utils.RIGHT];
                }
                break;
            case Utils.LEFT:
                if (currentPixel.x <= 0) {
                    return [{ x: Utils.y0_for_segment(6) - currentPixel.y - 1, y: Utils.y0_for_segment(4) - 1 }, Utils.UP];
                }
                break;
            case Utils.UP:
        }
        return Utils.handleNormalVelocity(currentPixel, currentVelocity);
    }

    static determineCurrentSegment(pixel) {
        if (pixel.y >= 0 &&
            pixel.y < Utils.side_length * 6 &&
            pixel.x >= 0 &&
            pixel.x < Utils.side_length) {
            return Math.floor(pixel.y / Utils.side_length);
        } else {
            return -1;
        }
    }

}
