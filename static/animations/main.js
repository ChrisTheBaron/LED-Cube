$(async function () {

    await API.connectAsync();

    let interval = null;

    $('#start').click(async () => {
        API.changeApplication('animations/' + $('#animation').val());
        if (interval != null) clearInterval(interval);
        interval = setInterval(() => API.sendHeartbeat(), 1000);
    });

});
