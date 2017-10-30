angular.module('app')
    .controller('pocsCtrl', pocsCtrl);

pocsCtrl.$inject = ['$scope', 'dataSvc', '$window', '$resource', '$location', '$anchorScroll'];
function pocsCtrl($scope, dataSvc, $window, $location, $resource, $anchorScroll) {

    var Pocs = dataSvc.managePocs();

    $scope.addPoc = addPoc;
    $scope.deletePoc = deletePoc;
    $scope.pocs = {};
    $scope.saveUpdate = saveUpdate;
    $scope.toggleEdit = toggleEdit;

    init();

    function init() {
        $scope.pocs = Pocs.query();
        $scope.showAdd = false;
        $scope.showEdit = false;
        $scope.update = {};
        $scope.newPoc = {};
    };

    function addPoc(newPoc) {
        Pocs.save(newPoc).$promise.then(function () {
            init();
        });
    };

    function deletePoc(pocId) {
        Pocs.delete({ id: pocId }).$promise.then(function () {
            init();
        });
    };

    function saveUpdate(updatedPoc) {
        Pocs.update({ id: updatedPoc.id }, updatedPoc);
            init();
    };

    function toggleEdit(contact) {
        $scope.showEdit = true;
        $scope.update = contact;
        $location.hash('pocs');
        $anchorScroll();
    };
};
