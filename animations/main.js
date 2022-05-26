let speed = 750;

$('#speed').change(() => {
    speed = 2500 - parseInt($('#speed').val());
    console.log(speed);
});

let running = false;
let frame = 0;

$(async function () {

    let animation = new Rainbow();

    await API.connectAsync();

    $('#start').click(async () => {
        if (running && !confirm("Are you sure you want to restart the simulation?")) {
            return;
        }
        running = false;
        //to ensure the loop below has stopped
        await sleep(speed + 50);
        render();
        await sleep(speed + 50);
        running = true;
        frame = 0;
    });

    while (true) {
        if (running) {
            render();
            animation.iterate();
            frame++;
        }
        await sleep(speed);
    }

    function render() {
        API.send(animation.render());
        $('#frame').text(`Iteration: ${frame}`);

    }

});
