'use strict';

var express = require('express');
var controller = require('./users.controller');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.whoAmI);
router.get('/:id', auth.isAuthenticated(), controller.getOne);
router.put('/:id', auth.isAuthenticated(), controller.update);

module.exports = router;