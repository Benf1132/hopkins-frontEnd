(function () {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('tripleDollar', tripleDollarFilter);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: 'cookies', quantity: 10, pricePerItem: 2.00 },
      { name: 'milk',    quantity: 2,  pricePerItem: 3.50 },
      { name: 'apples',  quantity: 6,  pricePerItem: 0.79 },
      { name: 'bread',   quantity: 1,  pricePerItem: 4.25 },
      { name: 'cereal',  quantity: 3,  pricePerItem: 5.99 }
    ];

    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.buyItem = function (index) {
      var item = toBuyItems[index];
      var purchased = angular.copy(item);
      boughtItems.push(purchased);
      toBuyItems.splice(index, 1);
    };
  }

  tripleDollarFilter.$inject = ['$filter'];
  function tripleDollarFilter($filter) {
    return function (amount) {
      var n = parseFloat(amount);
      if (isNaN(n)) n = 0;
      var formatted = $filter('currency')(n, '', 2);
      return '$$$' + formatted;
    };
  }
})();
