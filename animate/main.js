(async () => {

    const fps = 12;

    let frameData = await gifFrames({
        url: "http://localhost:8080/animations/template.gif",
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

    await API.connectAsync();

    while (true) {
        for (let i = 0; i < data.length; i++) {
            API.send(data[i]);
            await sleep(1000 / fps);
        }
    }

})();

async function sleep(int) {
    return new Promise((resolve) => setTimeout(resolve, int));
}
