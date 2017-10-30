angular
    .module('app')
    .controller('sailorDetsCtrl', sailorDetsCtrl);

sailorDetsCtrl.$inject = ['$scope', '$state', '$stateParams', 'dataSvc'];
function sailorDetsCtrl($scope, $state, $stateParams, dataSvc) {

    var userMgr = dataSvc.manageUser();

    $scope.addedRole = "";
    $scope.addRole = addRole;
    $scope.deleteUser = deleteUser;
    $scope.roles = dataSvc.getRoles();
    $scope.sailor = {};
    $scope.updateUser = updateUser;

    init();

    function init() {
        $scope.sailor = userMgr.get({ id: $stateParams.id }, function (data) {
            $scope.newSailor = data; // Used to update existing sailor
        });
    };

    function addRole() {
        dataSvc.addRole().save({ id: $scope.addedRole, enrolledUser: $scope.sailor.id }, function () {
            $scope.sailor = userMgr.get({ id: $stateParams.id });
        });
        $scope.addedRole = ""; // Reset dropdown menu in view
    };

    function deleteUser() {
        userMgr.delete({ id: $stateParams.id }, function () {
            $state.transitionTo('app.reports.roster', {}, { reload: true });
        });
    };

    function updateUser() {
        userMgr.update({ id: $stateParams.id }, $scope.newSailor, function (data) {
            $scope.sailor = data;
        });
        $scope.enableEdit = false;
    };
};
