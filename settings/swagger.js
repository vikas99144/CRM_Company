'use strict'

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

module.exports.configure = async (server) => {
  const swaggerOptions = {
    info: {
      title: 'API Documentation',
      version: '/api/v1/',
    },
    host: process.env.HOST,
    schemes: ['http', 'https'],
    securityDefinitions: {
      'jwt': {
        'type': 'apiKey',
        'name': 'Authorization',
        'in': 'header'
        // 'x-keyPrefix': 'Bearer '
      }
    },
    security: [{ jwt: [] }],
    grouping: 'tags'

  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
  ]);


  return true;
}