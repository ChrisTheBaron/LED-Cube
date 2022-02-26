'use strict';

class API {

    static async connectAsync() {
        this.socket = io({ auth: { token: getCookie('ticket') } });
        return new Promise((resolve, _) => {
            this.socket.on('connect', resolve);
        });
    }

    static send(message) {
        if (this.socket == null) {
            throw new Error("Need to call connectAsync first!");
        }
        this.socket.emit('message', message);
    }

}

//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
