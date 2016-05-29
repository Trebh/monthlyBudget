'use strict';

var expressConfig = {
  clientPort: 3000,
  port: 3001,
  server:'localhost',
  ip: '127.0.0.1',
  sessionStorage:'mongodb://localhost/session',
  secret: '...'
};

var mongoDB = {
  MONGODB_URL: 'mongodb://localhost/test'
};

module.exports = {
  expressConfig: expressConfig,
  mongoDB: mongoDB
};