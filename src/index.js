const Net = require('net');
// The port number and hostname of the server.
const port = 80;
const host = '192.168.137.118';

// Create a new TCP client.
const client = new Net.Socket();

client.connect({ port: port, host: host }), function() {
    console.log('TCP connection established with the server.');
    client.write('Hello, ESP.');
};


// Create  a local server
const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server,{
  cors:{
      origin:'*'
  }
})

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('message', data => {
        console.log('Dados do WEB: ' + data)
        io.emit('message', data)
        // client.write(data);
    })
    client.on('data', function(chunk) {
        console.log(`Data received from the server: ${chunk.toString()}.`);
        socket.on('response', data => {
            console.log('Dados do ESP' + data)
            io.emit('response', data)
        })   
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)})


client.on('end', function() {
    console.log('Requested an end to the TCP connection');});
