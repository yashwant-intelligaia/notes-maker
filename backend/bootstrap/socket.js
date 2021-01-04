const IO = require('koa-socket-2');
module.exports = (app) => {
    var io = new IO();
    io.attach(app);
    app._io.on('connection', socket => {
        console.log('socket', socket.id);
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            socket.emit('chat message', msg);
        });
    });

    io.on('chat message', (ctx, data) => {
        ctx.socket.broadcast.emit('chat message', data);
    })
}