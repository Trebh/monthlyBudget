(function() {

  'use strict';

  angular.module('monthlyBudget')
    .controller('newBudgetModalCtrl', newBudgetModalCtrl);

  newBudgetModalCtrl.$inject = ['Popeye', 'budgetService'];

  function newBudgetModalCtrl(Popeye, budgetService) {

    var vm = this;

    vm.cancel = cancel;
    vm.createBudget = createBudget;

    ///////////////////////////////////////////////////

    function cancel(){
      Popeye.closeCurrentModal();
    }

    function createBudget(name, amount, timeStart, timeEnd){
      budgetService.create(name, amount, timeStart, timeEnd)
        .then(function(res){
          Popeye.closeCurrentModal(res.data);
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }

})();