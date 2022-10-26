const app = require('express')();
const http = require('http').createServer(app);
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'myRandomHash';

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:3000', 'http://localhost:8080'],
    },
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    console.log(token);

    try {
        const user = jwt.verify(token, JWT_SECRET);

        console.log('user', user);

        socket.user = user;

        next();
    } catch (e) {
        console.log('error', e.message);

        return next(new Error(e.message));
    }
});

io.on('connection', (socket) => {
    console.log('user connected!');

    console.log('id: ', socket.user.id);

    socket.join(socket.user.id);

    socket.on('disconnect', () => {
        console.log('user disconnected!');
    });
});

app.get('/send', (req, res) => {
    io.emit('updateUser', {
        id: 200,
    });

    res.send('send ok to id: 200!');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
