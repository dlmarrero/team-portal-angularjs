angular.module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$location', 'authService', '$state', '$rootScope'];
function loginCtrl($scope, $location, authService, $state, $rootScope) {

    $scope.login = login;
    $scope.loginData = {};
    // $rootScope.message = "";

    $scope.$on('messageUpdate',function (event, data) {
        $rootScope.message = data;
        console.log("Data:",data);
        console.log("Event:",event);
        console.log("$scope.message",$scope.message)
    });

    function login() {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, { reload: true });
            },
            function (error_description) {
                // $scope.message = error_description.data.error_description; // Fix this
                console.log(error_description.data.error_description);
                $rootScope.$broadcast('messageUpdate',error_description.data.error_description);
            });
    };

};
