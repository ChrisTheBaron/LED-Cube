const side_length = 28;
const speed = 150;

$(async function () {

    //await API.connectAsync();

    //0-3. 0 = up, 1 = right
    let velocity;
    let body;
    let food;
    let alive;
    let score;

    async function setupAndPlay() {
        velocity = 1;
        body = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }];
        food = { x: 10, y: 10 };
        alive = true;
        score = 0;
        while (alive) {
            let nextPixel = determineNextPixel(body[body.length - 1], velocity);
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
            body.push(nextPixel);
            render();
            await sleep(speed);
        }
        alert("DEAD. Your score was " + score);
        if(confirm("Want to play again?")){
            await setupAndPlay();
        }
    }

    $('#left').click(() => { if (--velocity < 0) velocity = 3; });
    $('#right').click(() => { if (++velocity > 3) velocity = 0; });

    await setupAndPlay();

    function determineNextPixel(currentHead, velocity) {
        switch (velocity) {
            case 0:
                let ny = (currentHead.y - 1 < 0) ? side_length - 1 : currentHead.y - 1;
                return { x: currentHead.x, y: ny };
            case 1:
                let px = (currentHead.x + 1 > side_length) ? 0 : currentHead.x + 1;
                return { x: px, y: currentHead.y };
            case 2:
                let py = (currentHead.y + 1 > side_length) ? 0 : currentHead.y + 1;
                return { x: currentHead.x, y: py };
            case 3:
                let nx = (currentHead.x - 1 < 0) ? side_length - 1 : currentHead.x - 1;
                return { x: nx, y: currentHead.y };
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
            pixel = { x: randomInt(0, side_length - 1), y: randomInt(0, side_length - 1) };
        }
        while (intersectsWithBody(pixel))
        food = pixel;
    }

    function intersectsWithBody(pixel) {
        return body.some(b => b.x == pixel.x && b.y == pixel.y);
    }

    function render() {
        console.log(JSON.stringify(body));
        //#region just for testing
        $('svg').empty();
        for (let pos of body) {
            $('svg').append(`<g transform="translate(${pos.x * 10},${pos.y * 10})">
                <rect width="10" height="10" style="fill:rgb(255,0,0);"/>
            </g>`);
        }
        $('svg').append(`<g transform="translate(${food.x * 10},${food.y * 10})">
                <rect width="10" height="10" style="fill:rgb(0,255,0);"/>
            </g>`);
        $("#svg-outer").html($("#svg-outer").html());
        //#endregion
        //TODO 
        //API.send(colorMap);
    }

});