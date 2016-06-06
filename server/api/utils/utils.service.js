'use strict';

var config = require('../../../config/config').expressConfig;
var compose = require('composable-middleware');

exports.isOwner = isOwner;

function isOwner() {
  return compose()
    .use(function(req, res, next) {
      
    });
}