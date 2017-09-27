angular
    .module('app')
    .controller('profileCtrl', profileCtrl);


profileCtrl.$inject = ['$scope', 'dataSvc', 'authService', '$state'];
function profileCtrl($scope, dataSvc, authService, $state) {

    var authentication = authService.authentication;
    var userMgr = dataSvc.manageUser();

    $scope.enableEdit = false;
    $scope.updateProfile = updateProfile;
    $scope.userData = {};

    init();

    function init() {
        if (authentication.isAuth) {
            $scope.userData = dataSvc.getCurUser();
            $scope.newData = $scope.userData;
        }
        else {
            $state.transitionTo('app.main');
        }
    };

    function updateProfile() {
        userMgr.update({ id: $scope.userData.id }, $scope.newData, function (data) {
            $scope.userData = data;
        });
        $scope.enableEdit = false;
    };
};