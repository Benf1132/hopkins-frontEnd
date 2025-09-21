(function () {
  'use strict';

  angular.module('common')
    .service('FavoriteMenuService', FavoriteMenuService);

  FavoriteMenuService.$inject = ['$http', '$q', 'ApiPath'];
  function FavoriteMenuService($http, $q, ApiPath) {
    function parse(code) {
      if (!code) return null;
      var m = /^([A-Z]+)\s*([0-9]+)$/.exec(String(code).trim().toUpperCase());
      if (!m) return null;
      var cat = m[1];
      var idx = parseInt(m[2], 10) - 1;
      if (isNaN(idx) || idx < 0) return null;
      return { cat: cat, idx: idx, code: cat + (idx + 1) };
    }

    this.lookup = function (shortCode) {
      var p = parse(shortCode);
      if (!p) return $q.resolve(null);
      var url = ApiPath + '/menu_items/' + p.cat + '/menu_items/' + p.idx + '.json';
      return $http.get(url).then(function (resp) {
        var data = resp && resp.data;
        if (!data) return null;
        if (!data.short_name) data.short_name = p.code;
        data.categoryShortName = p.cat;
        return data;
      }, function () {
        return null;
      });
    };
  }
})();
