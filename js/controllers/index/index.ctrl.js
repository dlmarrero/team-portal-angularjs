angular.module('app')
.controller('indexController', 
['$scope', '$location', 'authService', 'apiCall', '$state',
function ($scope, $location, authService, apiCall, $state) {

  $scope.logOut = function () {
    authService.logOut();
    $location.path('/dashboard');
  }

  $scope.authentication = authService.authentication;

  if ($scope.authentication.isAuth) {

    apiCall.GetUserByName.get({ username: $scope.authentication.userName }, function (data) {
      $scope.userData = data;
    });

  }

  // Enable user account editing
  $scope.enableEdit = false;
  $scope.editUser = function () {
    $scope.enableEdit = !$scope.enableEdit
  }
  // Save changes to account data
  $scope.updateUser = function () {
    apiCall.Sailor.update({ id: $scope.userData.id }, $scope.userData, function (data) {
      $state.reload();
    });
  }

}])
