angular.module('roster', ['ngResource', 'devApi'])

.factory('SailorsAPI', ['$resource', 'devApiService', function($resource, devApiService) {
    return $resource(devApiService.aspApiUrl + '/sailors');
}])

.controller('RosterController', ['$scope', 'devApiService',
    function($scope, devApiService) {

        devApiService.Sailors.query(function(data) {
            $scope.sailors = data;
        })
        // REPLACE FIXED ID WITH $stateParams.Id when ready
        devApiService.Sailor.get({ id: 1 }, function(data) {
            $scope.sailors = data;
        })
    }])