angular.module('app')
.controller('rosterCtrl', rosterCtrl);

rosterCtrl.$inject = ['$scope', 'dataSvc'];
function rosterCtrl ($scope, dataSvc) {
    
    $scope.sailors = dataSvc.getUsers();

    // Default settings for table column display
    $scope.showRate = true;
    $scope.showName = true;
    $scope.showPhone = true;
    $scope.showAdsd = true;
    $scope.showPrd = true;
    $scope.showEaos = true;
    $scope.showReportDate = true;
    $scope.showRank = false;
    $scope.showEmail = false;
    $scope.showAddress = false;
    $scope.showRankDate = false;
    $scope.showBlueBadge = false;
    $scope.showDestUic = false;
    $scope.showDestCommand = false;
    $scope.showPortalRoles = false;
    
    // Table column presets
    $scope.presetOpt = '';
    $scope.setPreset = setPreset;

    // Sort table by
    $scope.propertyName = ['rate', 'lastName'];
    $scope.reverse = false;
    $scope.sortBy = sortBy;


    function setPreset (opt) {
        switch (opt) {
            case 'recall':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = true;
                $scope.showAddress = true;
                $scope.showPhone = true;
                $scope.showRankDate = false;
                $scope.showAdsd = false;
                $scope.showPrd = false;
                $scope.showEaos = false;
                $scope.showReportDate = false;
                $scope.showBlueBadge = false;
                $scope.showDestUic = false;
                $scope.showDestCommand = false;
                $scope.showPortalRoles = false;
                break;
            case 'admin':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = false;
                $scope.showAddress = false;
                $scope.showPhone = false;
                $scope.showRankDate = true;
                $scope.showAdsd = true;
                $scope.showPrd = true;
                $scope.showEaos = true;
                $scope.showReportDate = true;
                $scope.showBlueBadge = false;
                $scope.showDestUic = false;
                $scope.showDestCommand = false;
                $scope.showPortalRoles = false;
                break;
            case 'destination':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = false;
                $scope.showAddress = false;
                $scope.showPhone = false;
                $scope.showRankDate = false;
                $scope.showAdsd = false;
                $scope.showPrd = false;
                $scope.showEaos = false;
                $scope.showReportDate = true;
                $scope.showBlueBadge = true;
                $scope.showDestUic = true;
                $scope.showDestCommand = true;
                $scope.showPortalRoles = false;
                break;
        };
    };


    function sortBy (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
};
