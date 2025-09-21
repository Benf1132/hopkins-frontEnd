(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesStateController', CategoriesStateController);

  CategoriesStateController.$inject = ['categories'];
  function CategoriesStateController(categories) {
    var $ctrl = this;

    if (Array.isArray(categories)) {
      $ctrl.categories = categories;
    } else {
      $ctrl.categories = [];
    }
  }
})();
