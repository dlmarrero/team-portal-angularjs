angular.module('app')
.controller('pocsCtrl',
['$scope', 'apiCall', '$log',
function ($scope, apiCall, $log) {

    $scope.pocs = apiCall.Pocs.query();
    
    // Edit POC
    $scope.showEdit = false;

    $scope.toggleEdit = function (contact) {
        $scope.showEdit = true;
        $scope.update = contact;
    }

    $scope.saveUpdate = function (update) {
        update.update()
        apiCall.Poc.update({ id: update.id }, update, function (data) {
            $scope.showEdit = false;
            $scope.update = {}
        });
    };

    // Delete POC
    $scope.deletePoc = function (pocId) {
        apiCall.Poc.delete({ id: pocId }, function (data) {
            apiCall.Pocs.query(function (data) {
                $scope.newPoc = {};
                $scope.pocs = data;
                $scope.showAdd = false;
            });
        });
    };

    // Add POC
    $scope.showAdd = false;

    $scope.addPoc = function (update) {
        apiCall.Pocs.save(update, function (data) {
            apiCall.Pocs.query(function (data) {
                $scope.pocs = data;
                $scope.newPoc = {};
                $scope.showAdd = false;
            });
        });
    };

}])