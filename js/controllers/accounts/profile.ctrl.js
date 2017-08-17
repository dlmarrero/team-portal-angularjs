angular
    .module('app')
    .controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ['$scope', 'dataSvc', 'authService', '$log'];
function profileCtrl($scope, dataSvc, authService, $log) {

    var authentication = authService.authentication;
    var userMgr = dataSvc.manageUser();

    $scope.enableEdit = false;
    $scope.userData = dataSvc.getCurUser().get({ username: authentication.userName }, function (data) {
        $scope.newData = data;
    });

    $scope.updateProfile = updateProfile;

    function updateProfile() {
        $log.log('newData:', $scope.newData)
        userMgr.update({ id: $scope.userData.id }, $scope.newData, function (data) {
            $scope.userData = dataSvc.getCurUser().get({ username: authentication.userName });
        });
        $scope.enableEdit = false;
    };
};