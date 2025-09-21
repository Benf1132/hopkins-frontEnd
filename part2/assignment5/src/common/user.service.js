(function () {
  'use strict';

  angular.module('common')
    .service('UserService', UserService);

  function UserService() {
    var saved = null;
    this.save = function (obj) { saved = angular.copy(obj); };
    this.get  = function ()     { return saved ? angular.copy(saved) : null; };
    this.isRegistered = function () { return !!saved; };
  }
})();
