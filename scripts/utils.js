
const side_length = 24;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function determineLeftVelocity(velocity) {
    if (--velocity < UP) velocity = LEFT;
    return velocity;
}

function determineRightVelocity(velocity) {
    if (++velocity > LEFT) velocity = UP;
    return velocity;
}

function y0_for_segment(segment) {
    return side_length * segment;
}

function determineNextPixelAndVelocity(currentPixel, currentVelocity) {
    const currentSegment = determineCurrentSegment(currentPixel);
    switch (currentSegment) {
        case 0:
            return segment0(currentPixel, currentVelocity);
        case 1:
            return segment1(currentPixel, currentVelocity);
        case 2:
            return segment2(currentPixel, currentVelocity);
        case 3:
            return segment3(currentPixel, currentVelocity);
        case 4:
            return segment4(currentPixel, currentVelocity);
        case 5:
            return segment5(currentPixel, currentVelocity);
        default:
            throw new Error(`Out of bounds! ${currentPixel.x} ${currentPixel.y}`);
    }
}

function handleNormalVelocity(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case UP:
            return [{ x: currentPixel.x, y: currentPixel.y - 1 }, UP];
        case RIGHT:
            return [{ x: currentPixel.x + 1, y: currentPixel.y }, RIGHT];
        case DOWN:
            return [{ x: currentPixel.x, y: currentPixel.y + 1 }, DOWN];
        case LEFT:
            return [{ x: currentPixel.x - 1, y: currentPixel.y }, LEFT];
    }
}

function segment0(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case UP:
            if (currentPixel.y <= 0) {
                return [{ x: side_length - 1, y: y0_for_segment(5) - currentPixel.x - 1 }, LEFT];
            }
            break;
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: side_length - currentPixel.y - 1, y: y0_for_segment(2) }, DOWN];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: side_length - 1, y: y0_for_segment(5) + currentPixel.y }, LEFT];
            }
            break;
        case DOWN:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function segment1(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case DOWN:
            if (currentPixel.y >= y0_for_segment(2) - 1) {
                return [{ x: 0, y: y0_for_segment(4) - currentPixel.x - 1 }, RIGHT];
            }
            break;
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: 0, y: currentPixel.y + side_length }, RIGHT];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: y0_for_segment(2) - currentPixel.y - 1, y: y0_for_segment(6) - 1 }, UP];
            }
            break;
        case UP:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function segment2(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case UP:
            if (currentPixel.y <= y0_for_segment(2)) {
                return [{ x: side_length - 1, y: side_length - currentPixel.x - 1 }, LEFT];
            }
            break;
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: y0_for_segment(3) - currentPixel.y - 1, y: y0_for_segment(4) }, DOWN];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: side_length - 1, y: currentPixel.y - side_length }, LEFT];
            }
            break;
        case DOWN:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function segment3(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: 0, y: currentPixel.y + side_length }, RIGHT];
            }
            break;
        case DOWN:
            if (currentPixel.y >= y0_for_segment(4) - 1) {
                return [{ x: 0, y: y0_for_segment(6) - currentPixel.x - 1 }, RIGHT];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: y0_for_segment(4) - currentPixel.y - 1, y: y0_for_segment(2) - 1 }, UP];
            }
            break;
        case UP:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function segment4(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case UP:
            if (currentPixel.y <= y0_for_segment(4)) {
                return [{ x: side_length - 1, y: y0_for_segment(3) - currentPixel.x - 1 }, LEFT];
            }
            break;
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: y0_for_segment(5) - currentPixel.y - 1, y: 0 }, DOWN];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: side_length - 1, y: currentPixel.y - side_length }, LEFT];
            }
            break;
        case DOWN:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function segment5(currentPixel, currentVelocity) {
    switch (currentVelocity) {
        case RIGHT:
            if (currentPixel.x >= side_length - 1) {
                return [{ x: 0, y: currentPixel.y - y0_for_segment(5) }, RIGHT];
            }
            break;
        case DOWN:
            if (currentPixel.y >= y0_for_segment(6) - 1) {
                return [{ x: 0, y: y0_for_segment(2) - currentPixel.x - 1 }, RIGHT];
            }
            break;
        case LEFT:
            if (currentPixel.x <= 0) {
                return [{ x: y0_for_segment(6) - currentPixel.y - 1, y: y0_for_segment(4) - 1 }, UP];
            }
            break;
        case UP:
    }
    return handleNormalVelocity(currentPixel, currentVelocity);
}

function determineCurrentSegment(pixel) {
    if (pixel.y >= 0 &&
        pixel.y < side_length * 6 &&
        pixel.x >= 0 &&
        pixel.x < side_length) {
        return Math.floor(pixel.y / side_length);
    } else {
        return -1;
    }
}
