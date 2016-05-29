'use strict';

var Budget = require('../../model/budget').model;
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

};


exports.updateExpense = function(req, res) {

};