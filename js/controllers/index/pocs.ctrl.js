angular.module('app')
    .controller('pocsCtrl', pocsCtrl);

pocsCtrl.$inject['$scope', 'dataSvc', '$window', '$resource', '$location', '$anchorScroll']
function pocsCtrl($scope, dataSvc, $window, $location, $resource, $anchorScroll) {

    // Set $resource management object
    var Pocs = dataSvc.managePocs();

    // Populate POCs
    $scope.pocs = Pocs.query();


    // Edit POC
    $scope.showEdit = false;

    $scope.toggleEdit = function (contact) {
        $scope.showEdit = true;
        $scope.update = contact;
        $location.hash('pocs')
        $anchorScroll();
    };

    $scope.saveUpdate = function (updatedPoc) {
        Pocs.update({ id: updatedPoc.id }, updatedPoc);
        $scope.showEdit = false;
        $scope.update = {};
    };


    // Delete POC
    $scope.deletePoc = function (pocId) {
        Pocs.delete({ id: pocId }).$promise.then(function (data) {
            $scope.pocs = Pocs.query();
        });
        $scope.update = {};
        $scope.showEdit = false;
    };


    // Add POC
    $scope.showAdd = false;

    $scope.addPoc = function (newPoc) {
        Pocs.save(newPoc);
        $scope.pocs = Pocs.query();
        $scope.newPoc = {};
        $scope.showAdd = false;
    };
}
