const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to manage contacts',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Correct path

swaggerAutogen(outputFile, endpointsFiles, doc);
