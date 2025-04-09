// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to manage contacts',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // this must include ALL files with annotations

swaggerAutogen(outputFile, endpointsFiles, doc);
