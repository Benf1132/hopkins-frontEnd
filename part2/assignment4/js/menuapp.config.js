(function () {
  'use strict';

  angular.module('MenuApp')
    .config(['$locationProvider', '$qProvider', function ($locationProvider, $qProvider) {
      $locationProvider.hashPrefix('');
      $qProvider.errorOnUnhandledRejections(false);
    }])
    .run(['$rootScope', function ($rootScope) {
      $rootScope.$on('$stateChangeError', function (evt, to, toParams, from, fromParams, error) {
        console.error('[ui-router] $stateChangeError →', to && to.name, 'reason:', error);
      });
      $rootScope.$on('$stateChangeStart', function (evt, to, toParams, from) {
      });
      $rootScope.$on('$stateChangeSuccess', function (evt, to) {
      });
    }]);
})();
