
$('#seed').val(btoa(Math.random()).substr(3, 16));

$('#randomseed').click(() => {
    $('#seed').val(btoa(Math.random()).substr(3, 16));
});

let speed = 750;

$('#speed').change(() => {
    speed = 2500 - parseInt($('#speed').val());
    console.log(speed);
});

let running = false;
let frame = 0;

$(async function () {

    // grid[y][x]
    // 
    // makes the rendering easier
    var grid = new Array(side_length * 6);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(side_length).fill(false);
    }

    await API.connectAsync();

    $('#start').click(async () => {
        if (running && !confirm("Are you sure you want to restart the simulation?")) {
            return;
        }
        running = false;
        //to ensure the loop below has stopped
        await sleep(speed + 50);
        populate($('#seed').val());
        render();
        await sleep(speed + 50);
        running = true;
        frame = 0;
    });

    while (true) {
        let before = new Date().getTime();
        if (running) {
            render();
            compute();
            frame++;
        }
        let after = new Date().getTime();
        let diff = after - before;
        await sleep(Math.max(speed - diff, 0));
    }

    function compute() {

        var ngrid = new Array(side_length * 6);

        for (let i = 0; i < ngrid.length; i++) {
            ngrid[i] = new Array(side_length).fill(false);
        }

        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {

                let [l, lv] = determineNextPixelAndVelocity({ x, y }, LEFT);
                let [r, rv] = determineNextPixelAndVelocity({ x, y }, RIGHT);
                let [u, uv] = determineNextPixelAndVelocity({ x, y }, UP);
                let [d, dv] = determineNextPixelAndVelocity({ x, y }, DOWN);

                let [ll, llv] = determineNextPixelAndVelocity(l, determineLeftVelocity(lv));
                let [rl, rlv] = determineNextPixelAndVelocity(r, determineLeftVelocity(rv));
                let [ul, ulv] = determineNextPixelAndVelocity(u, determineLeftVelocity(uv));
                let [dl, dlv] = determineNextPixelAndVelocity(d, determineLeftVelocity(dv));

                let total =
                    (grid[l.y][l.x] ? 1 : 0) +
                    (grid[r.y][r.x] ? 1 : 0) +
                    (grid[d.y][d.x] ? 1 : 0) +
                    (grid[u.y][u.x] ? 1 : 0) +
                    (grid[ll.y][ll.x] ? 1 : 0) +
                    (grid[rl.y][rl.x] ? 1 : 0) +
                    (grid[dl.y][dl.x] ? 1 : 0) +
                    (grid[ul.y][ul.x] ? 1 : 0);

                ngrid[y][x] = grid[y][x];

                if (grid[y][x] && (total < 2 || total > 3)) {
                    ngrid[y][x] = false;
                } else if (grid[y][x] != true && total == 3) {
                    ngrid[y][x] = true;
                }
            }
        }

        grid = ngrid;

    }

    function populate(seed) {
        const myrng = new Math.seedrandom(seed);
        // 2/3rds looks about right
        for (let i = 0; i < (side_length * side_length * 2); i++) {
            const x = Math.floor(myrng() * side_length);
            const y = Math.floor(myrng() * side_length * 6);
            grid[y][x] = true;
        }
    }

    function render() {

        const aliveColour = [255, 255, 255];
        const deadColour = [0, 0, 0];

        let colorMap = new Array(side_length * side_length * 6);

        let i = 0;
        for (let y of grid) {
            for (let x of y) {
                colorMap[i] = x ? aliveColour : deadColour
                i++;
            }
        }

        API.send(colorMap);

        $('#frame').text(`Iteration: ${frame}`);

    }

});
