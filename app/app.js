(function() {
  'use strict';

  angular.module('monthlyBudget', ['ui.router', 
    'ngCookies',
    'pathgather.popeye'])
    .config(configure)
    .run(runBlock)
    .factory('authInterceptor', authInterceptor);

  configure.$inject = ['$httpProvider'];

  function configure( $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');
  }

  runBlock.$inject = ['$state','$http'];

  function runBlock($state, $http) {
    $state.go('home');
  }

  authInterceptor.$inject = ['$q', '$cookieStore', '$injector'];

  function authInterceptor($q, $cookieStore, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          var $state = $injector.get('$state');
          $state.go('login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else if (response.status === 409){
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

})();