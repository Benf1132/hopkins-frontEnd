(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsStateController', ItemsStateController);

  ItemsStateController.$inject = ['categoryParam', 'dataForCategory'];
  function ItemsStateController(categoryParam, dataForCategory) {
    var $ctrl = this;

    $ctrl.category = categoryParam;

    if (dataForCategory && Array.isArray(dataForCategory.menu_items)) {
      $ctrl.items = dataForCategory.menu_items;
    } else {
      $ctrl.items = [];
    }

    if (dataForCategory && dataForCategory.category) {
      $ctrl.categoryInfo = dataForCategory.category;
    } else {
      $ctrl.categoryInfo = null;
    }
  }
})();
