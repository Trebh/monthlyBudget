'use strict';

var express = require('express');
var router = express.Router();
var googleconfig = require('../../../config/google.js');

var User = require('../../model/user').model;


require('./google/passport').setup(User, googleconfig);

router.use('/google', require('./google'));


module.exports = router;

