'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.get('/',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }), auth.setTokenCookie);

module.exports = router;