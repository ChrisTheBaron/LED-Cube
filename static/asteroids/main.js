Controller.search();

$(async function () {

    await API.connectAsync();

    let playing = false;

    async function setupAndPlay() {
        if (playing && !confirm("Are you sure you want to restart your game? You will lose your current progress.")) {
            return;
        }
        API.changeApplication('games/asteroids');
    }

    API.onTerminate((message) => { alert(message + '. Hit \'Play\' to start again.'); playing = false; });

    setInterval(() => { if (playing) API.sendHeartbeat() }, 1000);

    function fire() {
        API.sendInput("FIRE");
    }

    function left() {
        API.sendInput("LEFT");
    }

    function right() {
        API.sendInput("RIGHT");
    }

    $('#left').click(left);
    $('#right').click(right);
    $('#play').click(setupAndPlay);
    $('#fire').click(fire);

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
            case 'FACE_2':
            case 'FACE_1':
                fire();
                break;
            default:
                console.log(event.detail.name);
                break;
        }
    }, false);

    document.onkeydown = function checkKey(e) {
        e = e || window.event;
        if (e.keyCode === 37) {
            left();
        }
        else if (e.keyCode === 39) {
            right();
        }
        else if (e.keyCode === 32) {
            fire();
        }
    };

});