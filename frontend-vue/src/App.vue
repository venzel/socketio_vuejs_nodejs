<template>
    <div>
        <div v-for="user in users" :key="user.id">
            id: {{ user.id }} name: {{ user.name }} status: {{ user.status }}
            <hr />
        </div>
    </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';
import jwt from 'jsonwebtoken';

export default {
    /**
     * @author Enéas Almeida <eneas.eng@yahoo.com>
     * @description Utiliza o padrão observer.
     */

    name: 'App',
    data: () => ({
        users: [
            { id: 100, name: 'Tiago', status: false },
            { id: 200, name: 'Cíntia', status: false },
            { id: 300, name: 'Liz', status: false },
        ],
    }),
    async created() {
        SocketioService.setup(this.generateToken());

        SocketioService.subscribe('changeStatus', (data) => {
            this.changeUserStatus(data);
        });

        SocketioService.listen('changeStatus');
    },
    methods: {
        generateToken() {
            try {
                const payload = {
                    data: {
                        id: 200,
                        name: 'Cíntia',
                    },
                };

                const token = jwt.sign(payload, process.env.VUE_APP_SECRET, {
                    expiresIn: 60 * 60,
                });

                console.log(token);

                return token;
            } catch (e) {
                return null;
            }
        },
        changeUserStatus(data) {
            const index = this.users.findIndex((e) => e.id === data.id);

            if (index !== -1) {
                this.users[index].status = !this.users[index].status;

                console.log(`User id ${this.users[index].id} changed!`);
            }
        },
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
};
</script>

<style></style>
