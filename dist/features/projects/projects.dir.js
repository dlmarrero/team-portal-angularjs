(function () {
    'use strict';

    angular
        .module('app')
        .directive('projectDetails', projectDetails)
        .directive('projectList', projectList)
        .directive('yourProjects', yourProjects);

    function projectDetails() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/projectDetails.html',
            controller: 'projectDetsCtrl',
            scope: {
                project: '=project'
            }
        };
    }

    function projectList() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/projectlist.html'
        };
    }

    function yourProjects() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/yourProjects.html',
            controller: 'projectListCtrl',
            controllerAs: 'vm'
        };
    }
}());