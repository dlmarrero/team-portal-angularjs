angular.module('reports')

.controller('rosterController', 
['$scope', 'apiCall', '$log', 
function ($scope, apiCalls, $log) {

    $scope.Users = apiCalls.Sailors;
    $log.log($scope.Users);
}])