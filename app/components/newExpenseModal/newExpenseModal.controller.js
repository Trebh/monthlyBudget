(function() {

  'use strict';

  angular.module('monthlyBudget')
    .controller('newExpenseModalCtrl', newExpenseModalCtrl);

  newExpenseModalCtrl.$inject = ['Popeye', 'budgetService', 'selectedBudget'];

  function newExpenseModalCtrl(Popeye, budgetService, selectedBudget) {

    var vm = this;

    vm.cancel = cancel;
    vm.createExpense = createExpense;

    ///////////////////////////////////////////////////

    function cancel(){
      Popeye.closeCurrentModal();
    }

    function createExpense(name, amount, dateRef, expCat, note){
      if (!dateRef){
        dateRef = new Date();
      }
      budgetService.addExpense(selectedBudget._id, name, amount, dateRef, expCat, note)
        .then(function(res){
          Popeye.closeCurrentModal(res.data);
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }

})();