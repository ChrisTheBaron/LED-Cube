const fps = 12;

let interval = null;
let frame = 0;

$().ready(async () => {

    await API.connectAsync();

    $('#file').on('change', async () => {

        let file = $('#file')[0].files[0];

        if (!file) {
            $('#progress').text("Please select a valid gif first.");
            return;
        }

        let url = URL.createObjectURL(file);

        $('#progress').text("Processing...");

        if (interval != null) {
            clearInterval(interval);
            interval = null;
        }

        frame = 0;

        let frameData = await gifFrames({
            url: url,
            frames: 'all',
            cumulative: true,
            outputType: 'png'
        });

        let data = new Array(frameData.length);

        for (let i = 0; i < frameData.length; i++) {
            let frame = frameData[i].getImage().data;
            data[i] = new Array(frame.length / 4);
            for (let j = 0; j < frame.length; j += 4) {
                let pixel = new Array(3);
                pixel[0] = frame[j];
                pixel[1] = frame[j + 1];
                pixel[2] = frame[j + 2];
                data[i][Math.floor(j / 4)] = pixel;
            }
        }

        interval = setInterval(() => {
            if (++frame > data.length) {
                frame = 0;
            }
            API.send(data[frame]);
        }, 1000 / fps);

        setTimeout(() => {
            //don't look behind the curtain
            $('#progress').text("Success!");
        }, 1750);

    });
})
