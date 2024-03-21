const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description:'Local Host',
        }
    ]
    };
const outputFile ='./swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);