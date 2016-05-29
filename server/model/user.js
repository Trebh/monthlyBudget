'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  username: String,
  created: Date,
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  budgets: [{
    type: Schema.Types.ObjectId,
    ref: 'Budget'
  }]
});

var User = mongoose.model('User', user);

module.exports = {
  model: User,
  schema: user
};