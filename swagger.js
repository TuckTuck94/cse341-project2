const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    servers: [
        {
            url: 'https://cse341-project2-o626.onrender.com', 
            description:'Michael\'s Render URL',
        },
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