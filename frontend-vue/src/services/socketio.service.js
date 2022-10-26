/**
 * @author Enéas Almeida <eneas.eng@yahoo.com>
 * @description Utiliza o padrão observer.
 */

import { io } from 'socket.io-client';

class SocketioService {
    socket = null;
    subscribes = {}; // { 'teste': () => {}}

    constructor() {
        this.subscribes['test'] = () => {
            console.log(`Function test subscribed!`);
        };
    }

    setup(token) {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
            auth: {
                token,
            },
        });

        console.log('Setup socket ok!');
    }

    subscribe(name, cb) {
        if (!this.socket) return true;

        this.subscribes[name] = cb;

        console.log(`function ${name} subscribed!`);
    }

    findFnCallback(name) {
        let aux = {
            exists: false,
            cb: null,
        };

        aux = {
            exists: true,
            cb: this.subscribes[name],
        };

        return aux;
    }

    listen(name) {
        if (!this.socket) return true;

        const { exists, cb } = this.findFnCallback(name);

        if (!exists) return true;

        console.log(`${name} in listen!`);

        this.socket.on(name, (data) => {
            return cb(data);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();
