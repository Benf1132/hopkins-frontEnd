(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective);

  function FoundItemsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'foundItems.template.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: function () {},
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  function ItemsLoaderIndicatorDirective() {
    return {
      restrict: 'E',
      templateUrl: 'loader/itemsloaderindicator.template.html'
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowDown = this;
    
    narrowDown.searchTerm = '';
    narrowDown.found = [];
    narrowDown.loading = false;
    narrowDown.nothingFound = false;

    narrowDown.narrowItDown = function () {
      narrowDown.nothingFound = false;
      narrowDown.found = [];
      
      var term = narrowDown.searchTerm.trim();
      
      if (!term) {
        narrowDown.nothingFound = true;
        return;
      }
      
      narrowDown.loading = true;
      
      MenuSearchService.getMatchedMenuItems(term).then(function (items) {
        narrowDown.found = items;
        narrowDown.nothingFound = (items.length === 0);
      }).catch(function () {
        narrowDown.found = [];
        narrowDown.nothingFound = true;
      }).finally(function () {
        narrowDown.loading = false;
      });
    };

    narrowDown.removeItem = function (index) {
      if (index >= 0 && index < narrowDown.found.length) {
        narrowDown.found.splice(index, 1);
      }
      
      narrowDown.nothingFound = (narrowDown.found.length === 0);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    var ENDPOINT = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';

    service.getMatchedMenuItems = function (searchTerm) {
      var term = searchTerm.trim().toLowerCase();
      
      return $http({ method: 'GET', url: ENDPOINT }).then(function (result) {
        var data = result.data;
        var foundItems = [];
        
        angular.forEach(data, function (category) {
          if (Array.isArray(category.menu_items)) {
            category.menu_items.forEach(function (item) {
              var desc = item.description.toLowerCase();
              if (desc.indexOf(term) !== -1) {
                foundItems.push(item);
              }
            });
          }
        });
        
        return foundItems;
      });
    };
  }
})();
