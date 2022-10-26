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

        SocketioService.subscribe('updateUser', (data) => {
            this.setStatus(data);
        });

        SocketioService.listen('updateUser');
    },
    methods: {
        generateToken() {
            try {
                const data = {
                    id: 200,
                    name: 'Cíntia',
                };

                const token = jwt.sign(data, process.env.VUE_APP_SECRET, {
                    expiresIn: 60 * 60,
                });

                console.log(token);

                return token;
            } catch (e) {
                return null;
            }
        },
        setStatus(data) {
            const index = this.users.findIndex((e) => e.id === data.id);

            if (index !== -1) {
                this.users[index].status = !this.users[index].status;
            }
        },
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
};
</script>

<style></style>
