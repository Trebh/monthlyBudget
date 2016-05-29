'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('./config/config');
var cors = require('cors');

server.listen(config.expressConfig.port);

server.listen(config.expressConfig.port, config.expressConfig.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.expressConfig
    .port, process.env.NODE_ENV);
});

app.use(cors());

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: './'
  });
});

app.get('/whoami', function(req, res) {
  var data = {
    server: config.expressConfig.server,
    port: config.expressConfig.port,
    apiPort: config.expressConfig.apiPort
  };
  res.send(data);
});

app.use(express.static('./'));