(function() {

  'use strict';

  angular.module('monthlyBudget')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['budgetService'];

  function homeCtrl(budgetService) {
    var vm = this;

    vm.addExpense = addExpense;
    vm.createBudget = createBudget;
    vm.getBudget = getBudget;

    ///////////////////////////////////////////

    init();

    ///////////////////////////////////////////

    function init() {

    }

    function createBudget(name, amount, timeStart, timeEnd) {
      budgetService.create(name, amount, timeStart, timeEnd)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getBudget(id) {
      budgetService.get(id)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function addExpense(expName, expAmount, expDate, expBudget, expCat, expNote) {
      budgetService.addExpense(expName, expAmount, expDate, expBudget, expCat, expNote)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

})();