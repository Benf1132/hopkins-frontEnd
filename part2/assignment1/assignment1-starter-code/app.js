(function () {
  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = '';
    $scope.message = '';
    $scope.messageClass = '';
    $scope.inputClass = '';  

    $scope.checkItems = function () {
      var count = countValidItems($scope.items);

      if (count === 0) {
        $scope.message = 'Please enter data first';
        $scope.messageClass = 'err';
        $scope.inputClass = 'input-error';
      } else if (count <= 3) {
        $scope.message = 'Enjoy!';
        $scope.messageClass = 'ok';
        $scope.inputClass = 'input-ok';
      } else {
        $scope.message = 'Too much!';
        $scope.messageClass = 'ok';
        $scope.inputClass = 'input-ok';
      }
    };

    function countValidItems(text) {
      if (!text) return 0;
      var parts = text.split(',');
      var total = 0;
      for (var i = 0; i < parts.length; i++) {
        var item = parts[i].trim();
        if (item.length > 0) total++;
      }
      return total;
    }
  }
})();
