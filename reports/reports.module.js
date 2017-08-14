angular.module('reports', ['api'])

    .controller('rosterController',
    ['$scope', 'apiCall', '$log',
        function ($scope, apiCall, $log) {
            apiCall.Sailors.query(function (data) {
                $scope.sailors = data;
            });

            // Default settings for table column display
            $scope.showRate = true;
            $scope.showRank = false;
            $scope.showName = true;
            $scope.showEmail = false;
            $scope.showAddress = false;
            $scope.showPhone = true;
            $scope.showRankDate = false;
            $scope.showAdsd = true;
            $scope.showPrd = true;
            $scope.showEaos = true;
            $scope.showReportDate = true;
            $scope.showBlueBadge = false;
            $scope.showDestUic = false;
            $scope.showDestCommand = false;
            $scope.showPortalRoles = false;

            $scope.presetOpt = '';

            $scope.setPreset = function (opt) {
                $log.log(opt)
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

            // Sort by
            $scope.propertyName = ['rate', 'lastName'];
            $scope.reverse = false;

            $scope.sortBy = function(propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
             };
        }])

    .controller('sailorDetailsController', [
        '$scope', '$state', '$stateParams', 'apiCall', '$log', '$window',
        function ($scope, $state, $stateParams, apiCall, $log, $window) {

            // Get sailor data
            function updateSailorData() {
                apiCall.Sailor.get({ id: $stateParams.id }, function (data) {
                    $scope.sailor = data;
                    $log.log($scope.sailor.rankDate)
                })
            }
            updateSailorData();

            // Get all available roles
            $scope.roles = apiCall.Roles.query(function (data) {
                $scope.roles = data;
            });

            // Add a role
            $scope.addRole = function () {
                apiCall.AddRole.save({ id: $scope.addedRole, enrolledUser: $scope.sailor.id }, function () {
                    updateSailorData();
                    $scope.addedRole = "";
                });
            };

            // Enable user account editing
            $scope.enableEdit = false;
            $scope.editUser = function () {
                $scope.enableEdit = !$scope.enableEdit
            }
            // Save changes to account data
            $scope.updateUser = function () {
                apiCall.Sailor.update({ id: $stateParams.id }, $scope.sailor, function (data) {
                    $state.reload();
                });
            }

            // Delete user account
            $scope.deleteUser = function () {
                apiCall.Sailor.delete({ id: $stateParams.id }, function (data) {
                    $state.transitionTo('app.reports.roster', {}, { reload: true });
                })
            }
        }])