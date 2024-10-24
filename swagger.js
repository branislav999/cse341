const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Holds information about contacts',
    },
    host: 'cse341-joqm.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/contacts.js']

swaggerAutogen(outputFile, endpointFiles, doc);

