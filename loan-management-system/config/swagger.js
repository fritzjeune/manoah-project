// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'tkp system',
            version: '1.0.0',
            description: 'API documentation',
        },
        tags: [
            {
                name: 'Borrowers',
                description: 'related to borrower management',
            },
            {
                name: 'Loans',
                description: 'Endpoints related to loans',
            },
            
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;