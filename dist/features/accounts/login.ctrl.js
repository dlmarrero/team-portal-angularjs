angular.module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$location', 'authService', '$state'];
function loginCtrl($scope, $location, authService, $state) {

    $scope.login = login;
    $scope.loginData = {};
    $scope.message = "";


    function login() {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, { reload: true });
            },
            function (error_description) {
                $scope.message = error_description.data.error_description; // Fix this
            });
    };

};
