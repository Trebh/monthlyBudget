(function() {

  'use strict';

  angular.module('monthlyBudget')
    .config(function($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'dist/html/login/login.html',
          controller: 'loginCtrl as login'
        });
    });

})();