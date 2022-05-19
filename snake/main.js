const speed = 200;

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

    function left() { velocity = determineLeftVelocity(velocity) }

    function right() { velocity = determineRightVelocity(velocity) }

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