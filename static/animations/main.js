$(async function () {

    await API.connectAsync();

    setInterval(() => API.sendHeartbeat(), 1000);

    $('#animation').change(async () => {
        API.changeApplication('animations/' + $('#animation').val());
    });

    $('#speed').change(() => {
        API.changeSpeed(parseFloat($('#speed').val()));
    });

    $('#animation').trigger('change');
    $('#speed').trigger('change');

});
