angular.module('accounts', ['ngResource', 'devApi'])

    .controller('RegisterController', ['$scope', 'devApiService',
        function ($scope, devApiService) {

            $scope.submit = function () {
                var newUser = new devApiService.Register({
                    email: $scope.email,
                    password: $scope.password,
                    confirmpassword: $scope.confirmpassword,
                    rate: $scope.rate,
                    rank: $scope.rank,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    adsd: $scope.adsd,
                    eaos: $scope.eaos,
                    prd: $scope.prd,
                    reportdate: $scope.reportdate,
                    rankdate: $scope.rankdate,
                    bluebadge: $scope.bluebadge,
                    destuic: $scope.destuic,
                    destcommand: $scope.destcommand
                });

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