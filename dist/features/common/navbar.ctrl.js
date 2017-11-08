angular
.module('app')
.controller('navbarCtrl', navbarCtrl);

navbarCtrl.$inject = ['$location', 'dataSvc', 'authService', '$scope'];
function navbarCtrl ($location, dataSvc, authService, $scope) {

  var vm = this;
  
  vm.authentication = authService.authentication;
  vm.logOut = logOut;
  vm.userData = {};

  // $scope.$on('authUpdate', function (event, data) {
  //   vm.authentication = data;
  //   console.log('Received broadcast');
  //   console.log(vm.authentication);
  //   init();
  // })

  init();

  function init () {
    if (vm.authentication.isAuth) {
      vm.userData = dataSvc.getCurUser();
      console.log("navbar ctrl found authdata");
    };
  };
  
  function logOut () {
    authService.logOut();
    $location.path('/dashboard');
  };
};
