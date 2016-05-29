'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budget = new Schema({
  name: String,
  amount: Number,
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  timeStart: Date,
  timeEnd: Date,
  note: String,
  cathegory: String
});

var Budget = mongoose.model('Budget', budget);

module.exports = {
  model: Budget,
  schema: budget
};