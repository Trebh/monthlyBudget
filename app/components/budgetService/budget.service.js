(function() {
  'use strict';

  angular.module('monthlyBudget')
    .factory('budgetService', budgetService);

  budgetService.$inject = ['$http', '$q', 'appSettings'];

  function budgetService($http, $q, appSettings) {

    var service = {
      create: create,
      get: get
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

    return service;
  }
})();