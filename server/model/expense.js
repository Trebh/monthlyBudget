'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expense = new Schema({
  amount: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  budget:{
    type: Schema.Types.ObjectId,
    ref: 'Budget'
  },
  dateRef: Date,
  note: String,
  cathegory: String,
  deleted: Boolean
});

var Expense = mongoose.model('Expense', expense);

module.exports = {
  model: Expense,
  schema: expense
};