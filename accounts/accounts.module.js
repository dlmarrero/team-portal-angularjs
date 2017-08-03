angular.module('accounts', ['ngResource', 'devApi'])

    // .factory('authService', ['$http', '$q', 'localStorageService', 'devApiService', function($http, $q, localStorageService, devApiService) {
    //     var authServiceFactory = {};

    //     var _authentication = {
    //         isAuth: false,
    //         userName: ""
    //     };

    //     var _saveRegistration = function(registration) {

    //         _logout();

    //         return devApiService.Register.save
    //     }
    // }])

    .controller('RegisterController', ['$filter', '$log', '$scope', 'devApiService',
        function ($filter, $log, $scope, devApiService) {

            $scope.$log = $log;
            

            $scope.submit = function () {

                $scope.adsd = new Date($scope.adsd);

                var newUser = new devApiService.Register({
                    Email: $scope.email,
                    Password: $scope.password,
                    ConfirmPassword: $scope.confirmpassword,
                    Rate: $scope.rate,
                    Rank: $scope.rank,
                    FirstName: $scope.firstname,
                    LastName: $scope.lastname,
                    ADSD: $scope.adsd,
                    EAOS: $scope.eaos,
                    PRD: $scope.prd,
                    ReportDate: $scope.reportdate,
                    RankDate: $scope.rankdate,
                    BlueBadge: $scope.bluebadge,
                    DestUIC: $scope.destuic,
                    DestCommand: $scope.destcommand
                });
                
                $log.log(newUser)

                newUser.$save();
            }

        }])
    .controller('SailorDetailsController', [
        '$scope', '$state', '$stateParams', 'devApiService',
        function ($scope, $state, $stateParams, devApiService) {

            devApiService.Sailor.get({ id: $stateParams.id }, function (data) {
                $scope.sailor = data;
            })
            // $scope.state = $state.current
            // $scope.params = $stateParams; 
        }])