'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('../config/config');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState){
  mongoose.connect(config.mongoDB.MONGODB_URL);
}

require('../config/express')(app);
require('./routes')(app);

server.listen(config.expressConfig.port, config.expressConfig.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.expressConfig
    .port, process.env.NODE_ENV);
});

app.use(cors());

app.use('/dist', express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('index.html',{root:'./'});
});


exports = module.exports = {
  app: app
};
