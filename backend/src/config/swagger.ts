import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Costume Rental Marketplace API',
    version,
    description: 'API documentation for the costume rental marketplace'
  },
  servers: [{
    url: 'http://localhost:4000/api'
  }]
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ['src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
