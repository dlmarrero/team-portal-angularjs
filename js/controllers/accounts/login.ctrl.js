angular.module('app')
.controller('loginController',
['$scope', '$location', 'authService', '$state',
function ($scope, $location, authService, $state) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, {reload: true});
            },
            function (error_description) {
                $scope.message = error_description.data.error_description;
            });
    };

}])
