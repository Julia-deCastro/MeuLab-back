require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const routes = require('./routes');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3347;

const app = express();
app.use(express.static('public'));
const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

// Carregue os certificados
const privateKey = fs.readFileSync('../../certs/privkey.pem', 'utf8');
const certificate = fs.readFileSync('../../certs/cert.pem', 'utf8');
//const ca = fs.readFileSync('caminho_para_ca_bundle.pem', 'utf8'); // Opcional, se houver bundle de certificados intermediários

const credentials = {
  key: privateKey,
  cert: certificate,
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
        url: 'https://localhost:3347', // Atualize a porta para 3347 para usar HTTPS
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
  // https://localhost:3347/api-docs/#/ (URL para acessar documentação)
);
app.use('/', (req, res) => {
  return res.status(200).json({
    notification: 'Ok, server is running!',
  });
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Listening on port (HTTPS): ${port}`);
});
