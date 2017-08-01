angular.module('roster', ['ngResource', 'devApi'])

    .factory('SailorsAPI', ['$resource', 'devApiService', function ($resource, devApiService) {
        return $resource(devApiService.aspApiUrl + '/sailors');
    }])
    .filter('milDate', function ($filter) {
        var angularDateFilter = $filter('date');
        return function (theDate) {
            return angularDateFilter(theDate, 'dd MMM yyyy');
        }
    })

    .controller('RosterController', ['$scope', 'devApiService',
        function ($scope, devApiService) {

            devApiService.Sailors.query(function (data) {
                $scope.sailors = data;
                console.log($scope.sailors)
            })
            // REPLACE FIXED ID WITH $stateParams.Id when ready
            // devApiService.Sailor.get({ id: 1 }, function(data) {
            //     $scope.sailor = data;
            // })
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