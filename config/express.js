/**
 * Express configuration
 */

'use strict';

/*var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');*/
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config').expressConfig;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var passport = require('passport');
var User = require('../server/model/user').model;
var expressValidator = require('express-validator');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var corsOptions = {
  origin: 'http://' + config.server + ':' + config.clientPort,
  credentials: true,

};

module.exports = function(app) {

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(session({
    store: new MongoStore({
      url: config.sessionStorage
    }),
    secret: config.secret,
    key: 'express.sid',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

};