'use strict';

var Budget = require('../../model/budget').model;
var Expense = require('../../model/expense').model;

var R = require('ramda');

exports.search = function(req, res) {

};

exports.getBudget = function(req, res) {
};

exports.getBudgetExpenses = function(req, res) {

};

exports.getExpense = function(req, res) {

};

exports.createBudget = function(req, res) {

  req.assert('name', 'Input Error').isAscii().isAlphanumeric();
  req.assert('amount', 'Input Error').notEmpty().isInt();
  req.assert('timeStart', 'Input Error').isDate();
  req.assert('timeEnd', 'Input Error').isDate();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  var budget = new Budget();
  budget.name = req.body.name;
  budget.amount = req.body.amount;
  budget.timeStart = new Date(req.body.timeStart);
  budget.timeEnd = new Date(req.body.timeEnd);
  budget.expenses = req.body.expenses;

  var users = R.insert(0, req.user, req.body.users);

  budget.users = users;

  budget
    .save()
    .then(function(savedBudget){
      res.json(savedBudget);
      return;
    })
    .catch(function(err){
      console.log(err);
      res.status(500).send('uh, oh, something went wrong');
      return err;
    });

};

exports.addExpense = function(req, res) {

  req.assert('name', 'Input Error').isAscii().isAlphanumeric();
  req.assert('amount', 'Input Error').notEmpty().isInt();
  req.assert('user', 'Input Error').optional().isAscii().isAlphanumeric();
  req.assert('dateRef', 'Input Error').optional().isDate();
  req.assert('budget', 'Input Error').isAscii().isAlphanumeric();
  req.assert('note', 'Input Error').optional().isAscii().isAlphanumeric();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  var expense = new Expense();
  expense.name = req.body.name;
  expense.amount = req.body.amount;
  expense.user = req.body.user || req.user.id;
  expense.dateRef = req.body.dateRef || new Date();
  expense.budget = req.body.budget;
  expense.note = req.body.note;

  expense
    .save()
    .then(function(savedExpense){
      res.json(savedExpense);
      return;
    })
    .catch(function(err){
      console.log(err);
      res.status(500).send('uh, oh, something went wrong');
      return err;
    });

};


exports.updateExpense = function(req, res) {

};