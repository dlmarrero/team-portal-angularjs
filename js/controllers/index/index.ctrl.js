angular
.module('app')
.controller('indexCtrl', indexCtrl)

indexCtrl.$inject = ['$location', 'dataSvc', 'authService'];
function indexCtrl ($location, dataSvc, authService) {

  var vm = this;
  
  vm.authentication = authService.authentication;
  vm.logOut = logOut;
  vm.userData = dataSvc.getCurUser().get({ username: vm.authentication.userName });
  
  function logOut () {
    authService.logOut();
    $location.path('/dashboard');
  };
};
