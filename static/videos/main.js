$(async function () {

    await API.connectAsync();

    setInterval(() => API.sendHeartbeat(), 1000);

    $('[data-video]').click((e) => {
        let video = $(e.target).data('video');
        API.changeApplication('video/' + video);
    });

});
