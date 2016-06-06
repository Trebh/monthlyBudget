'use strict';

var express = require('express');
var controller = require('./budgets.controller');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.search);
router.get('/:id', auth.isAuthenticated(), controller.getBudget);
router.get('/:id/expenses/', auth.isAuthenticated(), controller.getBudgetExpenses);
router.get('/:id/expenses/:id', auth.isAuthenticated(), controller.getExpense);
router.post('/', auth.isAuthenticated(), controller.createBudget);
router.post('/:id/expenses/', auth.isAuthenticated(), controller.addExpense);
router.put('/:id/expenses/:id', auth.isAuthenticated(), controller.updateExpense);

module.exports = router;