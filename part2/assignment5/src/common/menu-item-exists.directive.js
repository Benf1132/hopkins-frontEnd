(function () {
  'use strict';

  angular.module('common')
    .directive('menuItemExists', menuItemExists);

  menuItemExists.$inject = ['$q', 'FavoriteMenuService'];
  function menuItemExists($q, FavoriteMenuService) {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, ngModel) {
        ngModel.$asyncValidators.menuItemExists = function (val) {
          if (!val) return $q.resolve();
          return FavoriteMenuService.lookup(val).then(function (item) {
            return item ? true : $q.reject('no such item');
          });
        };
      }
    };
  }
})();
