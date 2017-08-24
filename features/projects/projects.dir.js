(function () {
    'use strict';

    angular
        .module ('app')
        .directive ('projectList', projectList)
        .directive('taskList', taskList);


    // function newProject () {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'features/projects/newproject.html'
    //     };
    // };

    function projectList () {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/projectlist.html'
        };
    };

    function taskList () {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/tasklist.html'
        };
    };
} ());