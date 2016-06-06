'use strict';

var R = require('ramda');

module.exports = {
  sumAllExpenses: sumAllExpenses
};

function sumAllExpenses(budget) {
  //TODO check if not populated
  return R.compose(R.sum, R.pluck('amount'))(budget.expenses);
}