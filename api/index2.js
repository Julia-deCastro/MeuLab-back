require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const routes = require('../src/routes');

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
app.use('/', (req, res) => {
  return res.json({
      success: true,
      message: "Sucesso!"
  })
})
app.listen(process.env.PORT || 3333);
