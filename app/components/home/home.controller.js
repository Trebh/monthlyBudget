(function() {

  'use strict';

  angular.module('monthlyBudget')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['budgetService'];

  function homeCtrl(budgetService) {
    var vm = this;

    vm.createBudget = createBudget;
    vm.title = 'allo allo';


    ///////////////////////////////////////////

    init();

    ///////////////////////////////////////////

    function init() {
     
    }

    function createBudget(name, amount, timeStart, timeEnd){
      budgetService.create(name, amount, timeStart, timeEnd)
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }

})();