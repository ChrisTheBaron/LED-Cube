const side_length = 24;
const speed = 200;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

Controller.search();

$(async function () {

    await API.connectAsync();

    let velocity;
    let body;
    let food;
    let alive;
    let score;

    async function setupAndPlay() {
        if (alive && !confirm("Are you sure you want to restart your game? You will lose your current progress.")) {
            return;
        }
        velocity = DOWN;
        body = [
            { x: side_length - 4, y: y0_for_segment(2) + 4 },
            { x: side_length - 5, y: y0_for_segment(2) + 4 },
            { x: side_length - 6, y: y0_for_segment(2) + 4 }
        ];
        placeFood();
        alive = true;
        score = 0;
        render();
        while (alive) {
            let [nextPixel, nextVelocity] = determineNextPixelAndVelocity(body[body.length - 1], velocity);
            if (intersectsWithBody(nextPixel)) {
                alive = false;
                break;
            } else if (nextPixel.x == food.x &&
                nextPixel.y == food.y) {
                score++;
                placeFood();
            } else {
                body.shift();
            }
            velocity = nextVelocity;
            body.push(nextPixel);
            render();
            await sleep(speed);
        }
        alert("Oops! Hit play to start again.");
    }

    function left() { if (--velocity < UP) velocity = LEFT; }

    function right() { if (++velocity > LEFT) velocity = UP; }

    $('#left').click(left);
    $('#right').click(right);

    $('#play').click(setupAndPlay);

    document.onkeydown = function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            left();
        }
        else if (e.keyCode === 39) {
            right();
        }
    };

    window.addEventListener('gc.button.press', function (event) {
        switch (event.detail.name) {
            case 'RIGHT_SHOULDER_BOTTOM':
            case 'RIGHT_SHOULDER':
            case 'DPAD_RIGHT':
                right();
                break;
            case 'LEFT_SHOULDER_BOTTOM':
            case 'LEFT_SHOULDER':
            case 'DPAD_LEFT':
                left();
                break;
        }
    }, false);

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

    async function sleep(int) {
        return new Promise((resolve) => setTimeout(resolve, int));
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function placeFood() {
        do {
            pixel = {
                x: randomInt(0, side_length - 1),
                y: randomInt(0, (side_length * 6) - 1)
            };
        }
        while (intersectsWithBody(pixel))
        food = pixel;
    }

    function intersectsWithBody(pixel) {
        return body.some(b => b.x == pixel.x && b.y == pixel.y);
    }

    function render() {

        $('#score').text(score);

        const bodyColour = [255, 0, 0];
        const foodColour = [0, 255, 0];
        const backColour = [10, 10, 10];//not 0, or you can't see it on the sim

        let colorMap = new Array(side_length * side_length * 6).fill(backColour);

        colorMap[(food.x + (food.y * side_length))] = foodColour;

        for (let pos of body) {
            colorMap[(pos.x + (pos.y * side_length))] = bodyColour;
        }

        API.send(colorMap);

        //#region just for testing
        //$('svg').empty();

        //const svgScale = 4;

        //for (let i = 0; i < 6; i++) {
        //    $('svg').append(`<g transform="translate(0,${side_length * svgScale * i})">
        //        <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(${backColour[0]},${backColour[1]},${backColour[2]});"/>
        //    </g>`);
        //}

        //for (let pos of body) {
        //    $('svg').append(`<g transform="translate(${pos.x * svgScale},${pos.y * svgScale})">
        //        <rect width="${svgScale}" height="${svgScale}" style="fill:rgb(${bodyColour[0]},${bodyColour[1]},${bodyColour[2]});"/>
        //    </g>`);
        //}

        //$('svg').append(`<g transform="translate(${food.x * svgScale},${food.y * svgScale})">
        //        <rect width="${svgScale}" height="${svgScale}" style="fill:rgb(${foodColour[0]},${foodColour[1]},${foodColour[2]});"/>
        //    </g>`);

        //$("#svg-outer").html($("#svg-outer").html());
        //#endregion

    }

});