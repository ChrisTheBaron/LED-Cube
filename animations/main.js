let speed = 750;

$('#speed').change(() => {
    speed = 2500 - parseInt($('#speed').val());
    console.log(speed);
});

let running = false;

$(async function () {

    let animation = null;

    await API.connectAsync();

    $('#start').click(async () => {

        running = false;
        //to ensure the loop below has stopped
        await sleep(speed + 50);

        let selectedAnimation = $('#animation').val();

        switch(selectedAnimation){
            case "rainbowmoving": animation = new RainbowMoving(); break;
            case "rainbowrotate": animation = new RainbowRotate(); break;
            case "sparkle": animation = new Sparkle(); break;
        }

        animation.populate();
        API.send(animation.render());
        await sleep(speed + 50);
        running = true;
    });

    while (true) {
        if (running) {
            API.send(animation.render());
            animation.iterate();
        }
        await sleep(speed);
    }

});
