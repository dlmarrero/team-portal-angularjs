(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectListCtrl', projectListCtrl)

    /** @ngInject */
    function projectListCtrl($scope, dataSvc, $log, $uibModal, $document) {

        var projMgr = dataSvc.manageProjs();
        var vm = this;

        // vm.create = create;
        vm.data = {};
        vm.newProject = {};

        init();

        function init() {
            vm.data = projMgr.query();
        };

    };

}());

// **** TODO: projectsCtrl ****
// Resolve vm.data before initilizing
// Filter projects by current or past
// Filter a list of team leads
// Add date created/modifed to back end
