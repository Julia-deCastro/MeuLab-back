const Net = require('net');
// The port number and hostname of the server.
const port = 80;
const host = '192.168.137.177'

// Create a new TCP client.
const client = new Net.Socket();
// process.on('warning', e => console.warn(e.stack));
client.connect({ port: port, host: host }), function () {
    console.log('TCP connection established with the server ESP.');
};

client.setKeepAlive([true][0]);

const len = (str) => {
    let size = Buffer.from(str).length;
    return size;
}

let teste1 = 'env';
// var tamanho = len(teste1);
// console.log(tamanho);
// client.write('14');
client.write('3\r');
client.write('env\r');

// Create  a local server
const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server, {
    cors: {
        origin: '*'
    },
})

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

client.on('data', function (chunk) {
    console.log(`${chunk.toString()}.`);})


io.on('connection', socket => {
    // console.log('Web is connected')
    socket.on('message', data => {

        console.log('Dados WEB: ' + data)
        client.write(data);
        io.emit('message', data)

    })
    client.on('data', chunk => {
        console.log(`${chunk.toString()}`);
        io.emit('response', chunk.toString())
    });
    socket.on('disconnect', () => {
        console.log('Web was disconnected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at ${SERVER_HOST}:${SERVER_PORT}`)
})


client.on('end', function () {
    console.log('Requested an end to the TCP connection');
});
