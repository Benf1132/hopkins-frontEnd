(function () {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['FavoriteMenuService', 'UserService'];
  function SignupController(FavoriteMenuService, UserService) {
    var sign = this;

    sign.model = { firstName: '', lastName: '', email: '', phone: '', favorite: '' };
    sign.saved = false;

    sign.submit = function (form) {
      if (form.$invalid) return;
      FavoriteMenuService.lookup(sign.model.favorite).then(function (item) {
        if (!item) {
          form.favorite.$setValidity('menuItemExists', false);
          return;
        }
        UserService.save({
          firstName: sign.model.firstName,
          lastName:  sign.model.lastName,
          email:     sign.model.email,
          phone:     sign.model.phone,
          favoriteCode: (item.short_name || sign.model.favorite).toUpperCase(),
          item: item
        });
        sign.saved = true;
      });
    };
  }
})();
