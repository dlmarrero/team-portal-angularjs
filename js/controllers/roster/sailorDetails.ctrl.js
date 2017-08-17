angular
    .module('app')
    .controller('sailorDetsCtrl', sailorDetsCtrl);

sailorDetsCtrl.$inject = ['$scope', '$state', '$stateParams', 'dataSvc'];
function sailorDetsCtrl($scope, $state, $stateParams, dataSvc) {
    
    var userMgr = dataSvc.manageUser();

    $scope.addedRole = "";
    $scope.enableEdit = false;
    $scope.roles = dataSvc.getRoles();
    $scope.sailor = userMgr.get({ id: $stateParams.id }, function (data) {
        $scope.newSailor = data;
    });
    
    $scope.addRole = addRole;
    $scope.deleteUser = deleteUser;
    $scope.updateUser = updateUser;


    // Add a role
    function addRole () {
        dataSvc.addRole().save({ id: $scope.addedRole, enrolledUser: $scope.sailor.id }, function () {
            $scope.sailor = userMgr.get({ id: $stateParams.id });
            $scope.addedRole = "";
        });
    };

    // Delete user account
    function deleteUser () {
        userMgr.delete({ id: $stateParams.id }, function (data) {
            $state.transitionTo('app.reports.roster', {}, { reload: true });
        });
    };

    // Save changes to account data
    function updateUser () {
        userMgr.update({ id: $stateParams.id }, $scope.newSailor, function (data) {
            $scope.enableEdit = false;
            $scope.sailor = $scope.newSailor;
        });
    };
};
