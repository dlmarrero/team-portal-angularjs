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
        vm.data = {};
        vm.newProject = {};
        vm.yourProjs = [];
        vm.completedProjs = [];
        vm.incompleteProjs = [];

        init();

        function init() {
            // ** Filter projects the user is part of and push to yourProjs[] **
            vm.data = projMgr.query(function (data) {
                // Iterate through each project
                angular.forEach(data, function (project) {
                    if (project.team === vm.curUser.team) {
                        vm.yourProjs.push(project);
                    };
                });
                for (var i = 0; i < data.length; i++) {
                    var proj = data[i];
                    //proj.complete ? vm.completedProjs.push(proj) : vm.incompleteProjs.push(proj);
                    if (proj.complete) {
                        vm.incompleteProjs.push(proj);
                    } else {
                        vm.completedProjs.push(proj);
                    }
                }
            });
            
        };

    };

}());

// **** TODO: projectsCtrl ****
// Resolve vm.data before initilizing
// Filter projects by current or past
// Add date created/modifed to back end
