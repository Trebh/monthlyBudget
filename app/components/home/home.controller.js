(function() {

  'use strict';

  angular.module('monthlyBudget')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['budgetService', 'Popeye'];

  function homeCtrl(budgetService, Popeye) {
    var vm = this;

    vm.addExpense = addExpense;
    vm.budgets = [];
    vm.expenses = [];
    vm.calcTotExpense = calcTotExpense;
    vm.calcPercUsed = calcPercUsed;
    vm.createBudget = createBudget;
    vm.deleteBudget = deleteBudget;
    vm.getBudget = getBudget;
    vm.listExpenses = listExpenses;
    vm.listMyBudgets = listMyBudgets;
    vm.openNewBudgetModal = openNewBudgetModal;
    vm.openNewExpenseModal = openNewExpenseModal;
    vm.selectedBudget = {};

    ///////////////////////////////////////////

    init();

    ///////////////////////////////////////////

    function init() {
      listMyBudgets();
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

    function deleteBudget(budgId) {
      budgetService.update(budgId, new Date())
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function listMyBudgets() {
      budgetService.getAll()
        .then(function(res) {
          vm.budgets = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function listExpenses(budget) {
      vm.expenses = budget.expenses;
      vm.selectedBudget = budget;
    }

    function calcTotExpense(budget) {
      budget.expenses = budget.expenses || [];
      var totExpense = budget.expenses
        .map(function(exp) {
          return exp.amount;
        })
        .reduce(function(a, b) {
          return a + b;
        },0);

      return totExpense;
    }

    function calcPercUsed(budget) {
      var percUsed = calcTotExpense(budget) / budget.amount * 100;
      return percUsed;
    }

    function openNewBudgetModal() {
      var modal = Popeye.openModal({
        templateUrl: '/dist/html/newBudgetModal/newBudgetModal.html',
        controller: 'newBudgetModalCtrl as budgetModal'
      });
      modal.closed.then(function(res) {
        if (res.name){
          vm.budgets.unshift(res);
        }
      });
    }

    function openNewExpenseModal(){
      if (!vm.selectedBudget._id){
        return;
      }
      var modal = Popeye.openModal({
        templateUrl: '/dist/html/newExpenseModal/newExpenseModal.html',
        controller: 'newExpenseModalCtrl as expenseModal',
        locals: {
          selectedBudget: vm.selectedBudget
        }
      });
      modal.closed.then(function(res) {
        if (res.name){
          vm.selectedBudget.expenses.unshift(res);
        }
      });
    }
  }

})();