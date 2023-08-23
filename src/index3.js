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

// WebSocket server config

// const WebSocket = require('ws');

// // cliente
// const ws = new WebSocket('ws://192.168.137.11:81');
// console.log(ws._req.host);

// ws.on('error', console.error);

// ws.on('open', function open() {
//   ws.send(JSON.stringify({
//     "cmd": 1
//   }));
// });

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });

//servidor
// const server = new WebSocket.Server({
//   port: 8080
// });
// let sockets = [];
// console.log('WS is running at port 8080');
// server.on('connection', function(socket) {
//   // Adicionamos cada nova conexão/socket ao array `sockets`
//   sockets.push(socket);
//   console.log('new connection!');
//   // Quando você receber uma mensagem, enviamos ela para todos os sockets
//   socket.on('message', function(msg) {
//     sockets.forEach(s => s.send(msg));
//     console.log(msg);
//   });
//   // Quando a conexão de um socket é fechada/disconectada, removemos o socket do array
//   socket.on('close', function() {
//     sockets = sockets.filter(s => s !== socket);
//     console.log('WS is close');
//   });
// });
