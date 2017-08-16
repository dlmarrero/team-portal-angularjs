angular.module('app')
.controller('indexController', 
['$scope', '$location', 'authService', 'apiCall', '$state', '$log', '$window',
function ($scope, $location, authService, apiCall, $state, $log, $window) {

  $scope.logOut = function () {
    authService.logOut();
    $location.path('/dashboard');
  }

  $scope.authentication = authService.authentication;

  $scope.userData = {};

  if ($scope.authentication.isAuth) {

    apiCall.GetUserByName.get({ username: $scope.authentication.userName }, function (data) {
      $scope.userData = data;
      $scope.toDos = data.toDos;
    });

  }


  // **** TO DO ****

  // Add ToDo

  $scope.showAdd = false;
  $scope.toggleAdd = function () {
    $scope.showAdd = !$scope.showAdd;
  }
  
  $scope.newToDo = {
    toDoItem: "",
    dueDate: "",
    priority: ""
  };

  $scope.addToDo = function () {
    $scope.newToDo.sailorId = $scope.userData.id;
    apiCall.AddToDo.save($scope.newToDo, function (data) {
      $scope.toDos.push(data);
      $scope.newToDo = {
        toDoItem: "",
        dueDate: "",
        priority: ""
      };
      $window.document.getElementById('toDoItem').focus();
    });
  };
  
  // Delete ToDo
  $scope.delToDo = function (toDoId) {
    apiCall.ToDo.delete({ id: toDoId }, function (data) {
      apiCall.ToDos.query({ sailorId: $scope.userData.id }, function (data) {
        $scope.toDos = data;
      });
    });
  };

  // **** THIS SHOULD BE IN A PROFILE CONTROLLER ****
  // Enable user account editing
  $scope.enableEdit = false;
  $scope.editUser = function () {
    $scope.enableEdit = !$scope.enableEdit
  }
  // Save changes to account data
  $scope.updateProfile = function () {
    apiCall.Sailor.update({ id: $scope.userData.id }, $scope.userData, function (data) {
      $state.reload();
    });
  }

}])
