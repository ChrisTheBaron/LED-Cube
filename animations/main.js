let speed;

$('#speed').change(() => {
    speed = 1000 - parseInt($('#speed').val());
    console.log(speed);
});

// some browsers persist this when refreshing
$('#speed').trigger('change');

let running = false;

$(async function () {

    let animation = null;

    await API.connectAsync();

    $('#start').click(async () => {
        running = false;
        //to ensure the loop below has stopped
        await sleep(speed + 50);

        let selectedAnimation = $('#animation').val();

        switch (selectedAnimation) {
            case "rainbowmoving": animation = new RainbowMoving(); break;
            case "rainbowrotate": animation = new RainbowRotate(); break;
            case "sparkle": animation = new Sparkle(); break;
            case "rain": animation = new Rain(); break;
            case "pipes": animation = new Pipes(); break;
        }

        animation.populate();
        API.send(animation.render());
        await sleep(speed + 50);
        running = true;
    });

    while (true) {
        let before = new Date().getTime();
        if (running) {
            API.send(animation.render());
            animation.iterate();
        }
        let after = new Date().getTime();
        let diff = after - before;
        await sleep(Math.max(speed - diff, 0));
    }

});
