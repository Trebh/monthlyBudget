(function() {

  'use strict';

  angular.module('monthlyBudget')
    .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'dist/html/home/home.html',
          controller: 'homeCtrl as home'
        });
    });

})();