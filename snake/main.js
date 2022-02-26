const side_length = 28;
const speed = 100;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

$(async function () {

    //await API.connectAsync();

    //0-3. 0 = up, 1 = right
    let velocity;
    let body;
    let food;
    let alive;
    let score;

    async function setupAndPlay() {
        velocity = RIGHT;
        body = [
            { x: side_length + 4, y: side_length + 4 },
            { x: side_length + 5, y: side_length + 4 },
            { x: side_length + 6, y: side_length + 4 }
        ];
        placeFood();
        alive = true;
        score = 0;
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
        alert("DEAD. Your score was " + score);
        if (confirm("Want to play again?")) {
            await setupAndPlay();
        }
    }

    function left() { if (--velocity < 0) velocity = 3; }

    function right() { if (++velocity > 3) velocity = 0; }

    $('#left').click(left);
    $('#right').click(right);

    document.onkeydown = function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            left();
        }
        else if (e.keyCode === 39) {
            right();
        }
    };

    await setupAndPlay();

    function determineNextPixelAndVelocity(currentHead, currentVelocity) {
        switch (determineCurrentSegment(currentHead)) {
            case 0:
                return segment0(currentHead, currentVelocity);
            case 1:
                return segment1(currentHead, currentVelocity);
            case 2:
                return segment2(currentHead, currentVelocity);
            case 3:
                return segment3(currentHead, currentVelocity);
            case 4:
                return segment4(currentHead, currentVelocity);
            case 5:
                return segment5(currentHead, currentVelocity);
            default:
                throw new Error(`Out of bounds! ${currentHead.x} ${currentHead.y}`);
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

    function segment1(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case UP:
                if (currentPixel.y - 1 < side_length) {
                    return [{ x: side_length * 2, y: currentPixel.x - side_length }, RIGHT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case RIGHT:
            case DOWN:
            case LEFT:
                return handleNormalVelocity(currentPixel, currentVelocity);
        }
    }

    function segment3(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case LEFT:
                return handleNormalVelocity(currentPixel, currentVelocity);
            case UP:
                if (currentPixel.y - 1 < side_length) {
                    return [{ x: (side_length * 3) - 1, y: side_length - (currentPixel.x - (side_length * 3)) }, LEFT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case RIGHT:
                if (currentPixel.x + 1 >= side_length * 4) {
                    return [{ x: 0, y: currentPixel.y }, RIGHT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case DOWN:
                if (currentPixel.y + 1 >= side_length * 2) {
                    return [{ x: (side_length * 2) - (currentPixel.x - side_length * 3), y: (side_length * 3) - 1 }, UP];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
        }
    }

    function segment5(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case UP:
                return handleNormalVelocity(currentPixel, currentVelocity);
            case LEFT:
                if (currentPixel.x - 1 < side_length) {
                    return [{ x: side_length - (currentPixel.y - side_length * 2), y: (side_length * 2) - 1 }, UP];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case DOWN:
                if (currentPixel.y + 1 >= side_length * 3) {
                    return [{ x: (side_length * 5) - currentPixel.x, y: (side_length * 2) - 1 }, UP];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case RIGHT:
                if (currentPixel.x + 1 >= side_length * 2) {
                    return [{ x: currentPixel.y, y: (side_length * 2) - 1 }, UP];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
        }
    }

    function segment0(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case UP:
                if (currentPixel.y - 1 < side_length) {
                    return [{ x: (3 * side_length) - currentPixel.x, y: 0 }, DOWN];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case RIGHT:
                return handleNormalVelocity(currentPixel, currentVelocity);
            case DOWN:
                if (currentPixel.y + 1 >= side_length * 2) {
                    return [{ x: side_length, y: (3 * side_length) - currentPixel.x }, RIGHT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case LEFT:
                if (currentPixel.x - 1 < 0) {
                    return [{ x: (4 * side_length) - 1, y: currentPixel.y }, LEFT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
        }
    }

    function segment4(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case DOWN:
                return handleNormalVelocity(currentPixel, currentVelocity);
            case LEFT:
                if (currentPixel.x - 1 < side_length * 2) {
                    return [{ x: side_length + currentPixel.y, y: side_length }, DOWN];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case UP:
                if (currentPixel.y - 1 < 0) {
                    return [{ x: (side_length * 3) - currentPixel.x, y: side_length }, DOWN];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
            case RIGHT:
                if (currentPixel.x + 1 >= side_length * 3) {
                    return [{ x: (side_length * 4) - currentPixel.y, y: side_length }, DOWN];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
        }
    }

    function segment2(currentPixel, currentVelocity) {
        switch (currentVelocity) {
            case UP:
            case RIGHT:
            case LEFT:
                return handleNormalVelocity(currentPixel, currentVelocity);
            case DOWN:
                if (currentPixel.y + 1 >= side_length * 2) {
                    return [{ x: (side_length * 2) - 1, y: currentPixel.x }, LEFT];
                } else {
                    return handleNormalVelocity(currentPixel, currentVelocity);
                }
        }
    }

    /**
     * (0,0)    ___
     *  ___ ___| 4 |___
     * | 0 | 1 | 2 | 3 |
     *  ---| 5 |--- ---
     *      ---
     */
    function determineCurrentSegment(pixel) {
        if (pixel.y >= side_length &&
            pixel.y < side_length * 2) {
            return Math.floor(pixel.x / side_length);
        } else if (pixel.y >= side_length * 2 &&
            pixel.x >= side_length &&
            pixel.x < side_length * 2) {
            return 5;
        } else if (pixel.y < side_length &&
            pixel.x >= side_length * 2 &&
            pixel.x < side_length * 3) {
            return 4;
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
            pixel = { x: randomInt(0, (side_length * 4) - 1), y: randomInt(0, (side_length * 3) - 1) };
        }
        while (intersectsWithBody(pixel) || determineCurrentSegment(pixel) < 0)
        food = pixel;
    }

    function intersectsWithBody(pixel) {
        return body.some(b => b.x == pixel.x && b.y == pixel.y);
    }

    function render() {
        console.log(JSON.stringify(body));
        //#region just for testing
        $('svg').empty();

        const svgScale = 6;

        $('svg').append(`<g transform="translate(0,${side_length * svgScale})">
                <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,50);"/>
            </g>`);

        $('svg').append(`<g transform="translate(${side_length * svgScale},${side_length * svgScale})">
            <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,100);"/>
        </g>`);

        $('svg').append(`<g transform="translate(${side_length * svgScale},${side_length * svgScale *2})">
            <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,100);"/>
        </g>`);

        $('svg').append(`<g transform="translate(${side_length * svgScale * 2},${side_length * svgScale})">
            <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,150);"/>
        </g>`);

        $('svg').append(`<g transform="translate(${side_length * svgScale * 2},0)">
            <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,150);"/>
        </g>`);

        $('svg').append(`<g transform="translate(${side_length * svgScale * 3},${side_length * svgScale})">
            <rect width="${side_length * svgScale}" height="${side_length * svgScale}" style="fill:rgb(255,255,200);"/>
        </g>`);

        for (let pos of body) {
            $('svg').append(`<g transform="translate(${pos.x * svgScale},${pos.y * svgScale})">
                <rect width="${svgScale}" height="${svgScale}" style="fill:rgb(255,0,0);"/>
            </g>`);
        }
        $('svg').append(`<g transform="translate(${food.x * svgScale},${food.y * svgScale})">
                <rect width="${svgScale}" height="${svgScale}" style="fill:rgb(0,255,0);"/>
            </g>`);
        $("#svg-outer").html($("#svg-outer").html());
        //#endregion
        //TODO 
        //API.send(colorMap);
    }

});