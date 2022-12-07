const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const IO = require('socket.io-client')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server,{
  cors:{
      origin:'*'
  }
})
const SOCKET = IO('192.168.137.221:80')
SOCKET.on('connect', () => console.log('[IO] Connect => A new connection has been established'));
SOCKET.emit('response', 'TESTE DE CONEXÃO')

const SERVER_HOST = '192.168.137.221'
const SERVER_PORT = 80

io.on('connection', socket => {
    // console.log('[IO] Connection => Server has a new connection')
    socket.on('message', data => {
        console.log(data)
        io.emit('message', data)
    })
    socket.on('response', data => {
        console.log(data)
        io.emit('response', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)})
