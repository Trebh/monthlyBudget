'use strict';

var Budget = require('../../model/budget').model;
var Expense = require('../../model/expense').model;
var utils = require('../utils/utils.service');
var moment = require('moment');
var R = require('ramda');

exports.search = function(req, res) {

};

exports.getBudget = function(req, res) {
  req.assert('id', 'Input Error').notEmpty().isInt();
  Budget.findById(req.params.id)
    .populate('expenses')
    .exec()
    .then(function(foundBudget) {
      if (!isBudgetOwner(foundBudget, req.user._id)) {
        res.status(403).send('Only the owner can retrieve his budget');
        return;
      }
      res.json(foundBudget);
      return;
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('uh, oh, something went wrong');
      return;
    });
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
    .then(function(savedBudget) {
      res.json(savedBudget);
      return;
    })
    .catch(function(err) {
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
  req.assert('budget', 'Input Error').optional().isAscii().isAlphanumeric();
  req.assert('note', 'Input Error').optional().isAscii();

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
  expense.budget = req.body.budget || req.params.id;
  expense.note = req.body.note;
  expense.deleted = false;

  Budget.findById(expense.budget)
    .populate('expenses')
    .exec()
    .then(function(foundBudget) {

      if (!isValidBudget(req,res,foundBudget)) {
        return;
      }
      if (moment(foundBudget.timeEnd).isBefore(moment(expense.dateRef)) || moment(foundBudget.timeStart).isAfter(moment(expense.dateRef))) {
        res.status(400).send('Not time for this budget');
        return;
      }
      var totExp = utils.sumAllExpenses(foundBudget);
      if ((totExp + expense.amount) > foundBudget.amount) {
        res.status(400).send('Not enough budget');
        return;
      }
      foundBudget.expenses.push(expense);
      var saveProms = Promise.all([expense.save(), foundBudget.save()]);
      return saveProms;
    })
    .then(function(results) {
      if (results) {
        res.json(results[0]);
      }
      return;
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('uh, oh, something went wrong');
      return err;
    });

};

exports.updateExpense = function(req, res) {

};

exports.updateBudget = function(req, res) {
  req.assert('timeEnd', 'Input Error').isDate();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  Budget.findById(req.params.id)
    .populate('expenses')
    .exec()
    .then(function(foundBudget) {
      if (!isValidBudget(req,res,foundBudget)) {
        return;
      }
      foundBudget.timeEnd = req.body.timeEnd;
      return foundBudget.save();
    })
    .then(function(savedBudget){
      if (savedBudget){
        res.json(savedBudget);
      }
      return;
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('uh, oh, something went wrong');
      return err;
    });

};

function isBudgetOwner(budget, userid) {
  return R.contains(userid, budget.users);
}

function isValidBudget(req, res, budget) {
  if (!budget) {
    res.status(400).send('No budget found');
    return false;
  }
  if (!isBudgetOwner(budget, req.user._id)) {
    res.status(403).send('Only the owner can modify his budget');
    return false;
  }

  return true;
}