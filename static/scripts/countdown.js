$(() => {

    const cookie = getCookie('ticket');

    if (cookie && cookie.length > 0) {

        const token = JSON.parse(atob(cookie.split('.')[1]));

        const exp = new Date(token.exp * 1000);

        setInterval(() => {
            let now = new Date().getTime();
            let howLongAgo = exp - now;
            $('#access').text("Time remaining: " + getHumanTime(howLongAgo));
        }, 500);

    }

});

function getHumanTime(timestamp) {

    // get rid of millis
    let time = Math.floor(Math.abs(timestamp) / 1000);

    let str = '';

    if (time > (60 * 60)) {
        let hours = Math.floor(time / (60 * 60));
        time -= hours * 60 * 60;
        str += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (time > 60) {
        let minutes = Math.floor(time / 60);
        time -= minutes * 60;
        if (str.length > 0) {
            str += ' and ';
        }
        str += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    if (time > 0.5) {//just in case some weird fp issue is happening
        let seconds = Math.floor(time);
        time -= seconds;
        if (str.length > 0) {
            str += ' and ';
        }
        str += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return str;

}
