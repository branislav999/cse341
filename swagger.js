const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Holds information about contacts',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/contacts.js']

swaggerAutogen(outputFile, endpointFiles, doc);

