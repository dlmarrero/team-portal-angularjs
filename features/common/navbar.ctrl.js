angular
.module('app')
.controller('navbarCtrl', navbarCtrl)

navbarCtrl.$inject = ['$location', 'dataSvc', 'authService'];
function navbarCtrl ($location, dataSvc, authService) {

  var vm = this;
  
  vm.authentication = authService.authentication;
  vm.logOut = logOut;
  vm.userData = {};

  init();

  function init () {
    if (vm.authentication.isAuth) {
      vm.userData = dataSvc.getCurUser().get({ username: vm.authentication.userName });
    };
  };
  
  function logOut () {
    authService.logOut();
    $location.path('/dashboard');
  };
};
