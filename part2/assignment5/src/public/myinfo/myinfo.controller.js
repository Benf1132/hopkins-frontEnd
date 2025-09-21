(function () {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserService'];
  function MyInfoController(UserService) {
    var info = this;
    info.user = UserService.get();
    info.isRegistered = UserService.isRegistered;
  }
})();
