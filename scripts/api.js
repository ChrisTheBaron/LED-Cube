'use strict';

class API {

    static async connectAsync(token) {
        this.socket = io({ auth: { token: token } });
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
