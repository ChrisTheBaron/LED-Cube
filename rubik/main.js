const c = {
    'U': [254, 254, 254],
    'R': [137, 18, 20],
    'F': [25, 155, 76],
    'D': [254, 213, 47],
    'B': [13, 72, 172],
    'L': [255, 85, 37]
};

let connected = false;

(async function () {
    await API.connectAsync();
    connected = true;
}());

window.updateCube = function (data) {
    const colorMap = data.map(d => c[d]);
    if (connected) {
        API.send(colorMap);
    }
}
