(function () {
  'use strict';

  angular.module('data').service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var apiRoot = 'https://coursera-jhu-default-rtdb.firebaseio.com';

    this.getAllCategories = function () {
      return $http.get(apiRoot + '/categories.json')
        .then(function (response) {
          if (!response || !response.data) {
            return []; 
          }
          return response.data;
        })
        .catch(function (error) {
          console.error('getAllCategories failed:', error);
          return []; 
        });
    };

    this.getItemsForCategory = function (categoryShortName) {
      var url = apiRoot + '/menu_items/' + categoryShortName + '.json';
      return $http.get(url)
        .then(function (response) {
          if (!response || !response.data) {
            return { category: null, menu_items: [] };
          }
          var data = response.data;

          if (!data.menu_items) { data.menu_items = []; }
          if (!data.category)   { data.category   = null; }

          return data;
        })
        .catch(function (error) {
          console.error('getItemsForCategory failed:', error);
          return { category: null, menu_items: [] };
        });
    };
  }
})();
