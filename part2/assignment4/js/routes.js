(function () {
  'use strict';

  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'js/views/categories.state.html',   
        controller: 'CategoriesStateController',
        controllerAs: '$ctrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items/{category}',
        templateUrl: 'js/views/items.state.html',       
        controller: 'ItemsStateController',
        controllerAs: '$ctrl',
        resolve: {
          categoryParam: ['$stateParams', function ($stateParams) {
            return $stateParams.category;
          }],
          dataForCategory: ['MenuDataService', 'categoryParam',
            function (MenuDataService, categoryParam) {
              return MenuDataService.getItemsForCategory(categoryParam);
            }
          ]
        }
      });
  }
})();
