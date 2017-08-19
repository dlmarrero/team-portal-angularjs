angular
    .module('app')
    .controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ['$scope', 'dataSvc', 'authService'];
function profileCtrl($scope, dataSvc, authService) {

    var authentication = authService.authentication;
    var userMgr = dataSvc.manageUser();

    $scope.enableEdit = false;
    $scope.userData = dataSvc.getCurUser().get({ username: authentication.userName }, function (data) {
        $scope.newData = data;
    });

    $scope.updateProfile = updateProfile;

    function updateProfile() {
        userMgr.update({ id: $scope.userData.id }, $scope.newData, function (data) {
            $scope.userData = dataSvc.getCurUser().get({ username: authentication.userName });
        });
        $scope.enableEdit = false;
    };
};