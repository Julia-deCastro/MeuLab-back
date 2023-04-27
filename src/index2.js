require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const routes = require('./routes');

const port = process.env.PORT || 3333;

const app = express();
app.use(express.static('public'));
const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'WebLab - Swagger',
      description: 'Documentação do projeto desenvolvido pelo EITA.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://localhost:3333',
      },
    ],
  },
  apis: ['./src/routes/**/doc/*.js'],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
  // https://localhost:3333/api-docs/#/ (URL para acessar documentação)
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// TCP IP server config

const Net = require('net');
// The port number and hostname of the server.
const TCPport = 80;
const host = '192.168.137.249'

// Create a new TCP client.
const client = new Net.Socket();
// process.on('warning', e => console.warn(e.stack));


// const len = (str) => {
//     let size = Buffer.from(str).length;
//     return size;
// }

// let teste1 = 'env';
// var tamanho = len(teste1);
// console.log(tamanho);
// client.write('14');
// client.write('3\r');
// client.write('env\r');

// Create  a local server
const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const appTCP = new Koa()
const server = http.createServer(appTCP.callback())
const io = socket(server, {
  cors: {
    origin: '*'
  },
})

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080
// client.on('data', function (chunk) {
//     console.log(`${chunk.toString()}.`);})

require('events').defaultMaxListeners = 100;
io.on('connection', socket => {
  socket.on('connectionESP', data => {
    console.log(data)
    // client.connect({ port: data.port, host: data.host }), function () {
    //   console.log('TCP connection established with the server ESP.');
    // };
  })
  socket.on('message', data => {

    console.log('Dados WEB: ' + data)
    client.write(data);
    io.emit('message', data)

  })
  client.on('data', chunk => {
    console.log(`${chunk.toString()}`);
    io.emit('response', chunk.toString())
  });
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running at ${SERVER_HOST}:${SERVER_PORT}`)
})


client.on('end', function () {
  console.log('Requested an end to the TCP connection');
});