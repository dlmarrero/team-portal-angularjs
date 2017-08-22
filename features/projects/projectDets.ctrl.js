(function(){
    'use strict';

    angular
        .module('app')
        .controller('projectDetsCtrl', projectDetsCtrl)

    /** @ngInject */
    function projectDetsCtrl(dataSvc, $stateParams, $log, $scope){
        var projMgr = dataSvc.manageProjs();
        var teamMgr = dataSvc.manageTeam();
        
        $scope.addTeamMembers = addTeamMembers;
        $scope.delTeamMember = delTeamMember;
        $scope.project = {};
        $scope.chart = [];
        $scope.labels = ["Complete", "Incomplete"];
        $scope.users = {};
        
        init();

        function init(){
            // Hide add team member dialog by default
            $scope.addTeamMember = false;
            // Get project data and set up work items chart
            $scope.project = projMgr.get({ id: $stateParams.id }, function (data) {
                $scope.complete = 0;
                $scope.incomplete = 0;
                angular.forEach(data.workItems, function (item) {
                    if (item.complete) {
                        $scope.complete += 1;
                    }
                    else {
                        $scope.incomplete += 1;
                    };
                });
                $scope.chart.push($scope.complete);
                $scope.chart.push($scope.incomplete);
            });
            // Get list of users to add team members
            $scope.users = dataSvc.getUsers();
        };


        function addTeamMembers (user) {
            $log.log('add tm')
            var teamMember = {
                projectId: $scope.project.id,
                sailorId: user.id,
                userName: user.userName,
                rateName: user.rateName
            };
            teamMgr.save(teamMember, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id }, function () {
                    $scope.selected = "";
                });
            });
        };

        function delTeamMember (id) {
            $log.log(id);
            teamMgr.delete({ id: id}, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        };

    };

}());