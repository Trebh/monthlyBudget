(function() {
  'use strict';

  angular.module('monthlyBudget')
    .factory('budgetService', budgetService);

  budgetService.$inject = ['$http', '$q', 'appSettings'];

  function budgetService($http, $q, appSettings) {

    var service = {
      create: create,
      get: get,
      update: update,
      addExpense: addExpense
    };

    function create(name, amount, timeStart, timeEnd, expenses, users) {
      var data = {
        amount: amount,
        timeStart: timeStart,
        timeEnd: timeEnd,
        name: name,
        expenses: expenses || [],
        users: users || []
      };
      return $http.post('http://' + appSettings.server + ':' + appSettings.apiPort + '/api/budgets/', data);
    }

    function get(id){
      return $http.get('http://' + appSettings.server + ':' + appSettings.apiPort + '/api/budgets/' + id);
    }

    function addExpense(expName, expAmount, expDate, expBudget, expCat, expNote, user){
      var data = {
        amount: expAmount,
        dateRef: expDate,
        name: expName,
        cathegory: expCat,
        note: expNote,
        user: user
      };
      return $http.post('http://' + appSettings.server + ':' + appSettings.apiPort + '/api/budgets/' + expBudget + '/expenses', data);
    }

    function update(budgetid, timeEnd){
      var data = {
        timeEnd: timeEnd
      };

      return $http.put('http://' + appSettings.server + ':' + appSettings.apiPort + '/api/budgets/' + budgetid, data);
    }

    return service;
  }
})();