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
        grid[i] = new Array(side_length).fill([0, 0, 0]);
    }

    await API.connectAsync();

    $('#start').click(async () => {
        if (running && !confirm("Are you sure you want to restart the simulation?")) {
            return;
        }
        running = false;
        //to ensure the loop below has stopped
        await sleep(speed + 50);
        populate();
        render();
        await sleep(speed + 50);
        running = true;
        frame = 0;
    });

    while (true) {
        if (running) {
            render();
            compute();
            frame++;
        }
        await sleep(speed);
    }

    function compute() {
        for (let y = 0; y < side_length * 6; y++) {
            for (let x = 0; x < side_length; x++) {
                if(grid[y][x][2] > 0){
                    grid[y][x][2] = Math.max(grid[y][x][2] - 0.05, 0);
                } else if(Math.random() > 0.6){
                    grid[y][x] = [Math.random(), 1, 0.5];
                } else {
                    grid[y][x] = [0, 0, 0];
                }
            }
        }
    }

    function populate(seed) {
        // 2/3rds looks about right
        for (let i = 0; i < (side_length * side_length * 2); i++) {
            const x = Math.floor(Math.random() * side_length);
            const y = Math.floor(Math.random() * side_length * 6);
            grid[y][x] = [Math.random(), 1, 0.5];
        }
    }

    function render() {

        let colorMap = new Array(side_length * side_length * 6);

        let i = 0;
        for (let y of grid) {
            for (let x of y) {
                colorMap[i] = hslToRgb(...x);
                i++;
            }
        }

        API.send(colorMap);

        $('#frame').text(`Iteration: ${frame}`);

    }

});

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
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
