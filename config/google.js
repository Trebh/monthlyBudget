'use strict';

var expressConfig = require('./config').expressConfig;

module.exports = {
  'appID' : '569322145752-o6e4ssu69kbh55da0pab3g2fj8eum4bq.apps.googleusercontent.com',
  'appSecret' : 'lBBdOLjqNxdrgNdi19aZ19Ov',
  'callbackUrl' : 'http://' + expressConfig.server + ':' + expressConfig.port + '/api/auth/google/callback'
};