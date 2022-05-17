const speed = 25;

const SHIP_SLOW_FACTOR = 4;
const ASTEROID_SLOW_FACTOR = 6;

const START_LIVES = 5;
const START_ROIDS = 6;

$(async function () {

    await API.connectAsync();

    let asteroidmove;
    let shipmove;

    let life;
    let ship;
    let asteroids;
    let bullets;
    let score;

    let intervalID;

    async function setupAndPlay() {
        if (intervalID != null && !confirm("Are you sure you want to restart your game? You will lose your current progress.")) {
            return;
        }
        shipmove = SHIP_SLOW_FACTOR;
        asteroidmove = ASTEROID_SLOW_FACTOR;
        life = START_LIVES;
        ship = { position: { x: side_length - 4, y: y0_for_segment(2) + 4 }, velocity: DOWN };
        asteroids = [];
        bullets = [];
        for (let i = 0; i < START_ROIDS; i++) {
            placeAsteroid();
        }
        score = 0;
        render();
        intervalID = setInterval(loop, speed);
    }

    function loop() {

        let initCount = asteroids.length;

        if (--shipmove <= 0) {
            let [nextPixel, nextVelocity] = determineNextPixelAndVelocity(ship.position, ship.velocity);
            ship.velocity = nextVelocity;
            ship.position = nextPixel;
            shipmove = SHIP_SLOW_FACTOR;
        }

        for (let i = 0; i < bullets.length; i++) {
            let [nextBulletPixel, nextBulletVelocity] = determineNextPixelAndVelocity(bullets[i].position, bullets[i].velocity);
            bullets[i].position = nextBulletPixel;
            bullets[i].velocity = nextBulletVelocity;
        }

        if (--asteroidmove <= 0) {
            for (let i = 0; i < asteroids.length; i++) {
                let [nextRoidPixel, nextRoidVelocity] = determineNextPixelAndVelocity(asteroids[i].position, asteroids[i].velocity);
                asteroids[i].position = nextRoidPixel;
                asteroids[i].velocity = nextRoidVelocity;
            }
            asteroidmove = ASTEROID_SLOW_FACTOR;
        }

        for (let i = 0; i < asteroids.length; i++) {
            for (let j = 0; j < bullets.length; j++) {
                if (intersects(asteroids[i].position, bullets[j].position)) {
                    asteroids[i].flag = true;
                    bullets[j].flag = true;
                }
            }
        }

        if (asteroids.some(r => intersectsWithShip(r.position))) {
            if (--life <= 0) {
                return die();
            }
        }

        asteroids = asteroids.filter(a => !a.flag);
        bullets = bullets.filter(b => !b.flag);

        let newCount = asteroids.length;

        let kill = initCount - newCount;

        score += kill;

        if (kill > 0) {
            for (let i = 0; i < 1 + Math.floor(Math.log(score + 1)); i++) {
                placeAsteroid();
            }
        }

        render();
    }

    function die() {
        alert("Oops! Hit play to start again.");
        clearInterval(intervalID);
    }

    function fire() {
        let [nextPosition, nextVelocity] = determineNextPixelAndVelocity(ship.position, ship.velocity);
        if (!bullets.some(b => intersects(b.position, nextPosition))) {
            console.log("fire");
            bullets.push({ position: nextPosition, velocity: nextVelocity });
        }
    }

    function left() { console.log("left"); if (--ship.velocity < UP) ship.velocity = LEFT; }

    function right() { console.log("right"); if (++ship.velocity > LEFT) ship.velocity = UP; }

    $('#left').click(left);
    $('#right').click(right);
    $('#play').click(setupAndPlay);
    $('#fire').click(fire);

    document.onkeydown = function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            left();
        }
        else if (e.keyCode === 39) {
            right();
        }
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function placeAsteroid() {
        do {
            position = {
                x: randomInt(0, side_length - 1),
                y: randomInt(0, (side_length * 6) - 1)
            };
        }
        while (intersectsWithShip(position) ||
        asteroids.some(r => intersects(position, r)) ||
            bullets.some(r => intersects(position, r)));
        velocity = randomInt(0, 3);
        asteroids.push({ position, velocity });
    }

    function intersectsWithShip(pixel) {
        return intersects(ship.position, pixel);
    }

    function intersects(a, b) {
        return a.x == b.x && a.y == b.y;
    }

    function render() {

        $('#score').text(score);
        $('#lives').text(life);

        const shipColour = [255, 255, 255];
        const roidColour = [0, 255, 0];
        const bulletColour = [255, 0, 0];
        const backColour = [10, 10, 10];//not 0, or you can't see it on the sim

        let colorMap = new Array(side_length * side_length * 6).fill(backColour);

        colorMap[(ship.position.x + (ship.position.y * side_length))] = shipColour;

        for (let roid of asteroids) {
            colorMap[(roid.position.x + (roid.position.y * side_length))] = roidColour;
        }

        for (let bullet of bullets) {
            colorMap[(bullet.position.x + (bullet.position.y * side_length))] = bulletColour;
        }

        API.send(colorMap);

    }

});