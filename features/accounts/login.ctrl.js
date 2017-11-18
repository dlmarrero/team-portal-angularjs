angular.module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$location', 'authService', '$state', '$rootScope'];
function loginCtrl($scope, $location, authService, $state, $rootScope) {

    $scope.login = login;
    $scope.loginData = {};

    $scope.$on('messageUpdate', function (event, data) {
        $rootScope.message = data;
    });

    function login() {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, { reload: true });
            },
            function (error_description) {
                $rootScope.$broadcast('messageUpdate', error_description.data.error_description);
            });
    };

};
