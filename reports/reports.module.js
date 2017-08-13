angular.module('reports', ['api'])

    .controller('rosterController',
    ['$scope', 'apiCall', '$log',
        function ($scope, apiCall, $log) {
            apiCall.Sailors.query(function (data) {
                $scope.sailors = data;
            });
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