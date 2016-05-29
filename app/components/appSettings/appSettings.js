'use strict';

angular.module('monthlyBudget')
  .service('appSettings', function() {

    return {
      server: 'localhost',
      port: '3000',
      apiPort: '3000',
      user: undefined
    };
  });