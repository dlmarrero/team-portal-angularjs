(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectListCtrl', projectListCtrl);

    /** @ngInject */
    function projectListCtrl($scope, dataSvc, $log, $uibModal, $document, authService, $filter) {

        var projMgr = dataSvc.manageProjs();
        var username = $filter('lowercase')(authService.authentication.userName);
        var vm = this;

        vm.curUser = dataSvc.getCurUser();
        // vm.create = create;
        vm.data = {};
        vm.newProject = {};
        vm.yourProjs = [];

        init();

        function init() {
            // ** Filter projects the user is part of and push to yourProjs[] **
            vm.data = projMgr.query(function (data) {
                // Iterate through each project
                angular.forEach(data, function(project) {
                    if (project.team === vm.curUser.team) {
                        vm.yourProjs.push(project);
                    };
                    // angular.forEach(project.teamMembers, function(tm) {
                    //     var tMember = ($filter('lowercase')(tm.userName));
                    //     if (username == tMember) {
                    //         // $scope.$apply(function () {
                    //             vm.yourProjs.push(project);
                    //         // });
                    //     }
                    // });

                    // angular.forEach(project[10], function(x) {

                    // $log.log(x)
                    // })
                    // if (project.teamMembers.indexOf(username)) {
                    //     $log.log(project)
                    // }
                });
            });
        };

    };

}());

// **** TODO: projectsCtrl ****
// Resolve vm.data before initilizing
// Filter projects by current or past
// Filter a list of team leads
// Add date created/modifed to back end