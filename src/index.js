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
        console.log(data)
        io.emit('message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)})
