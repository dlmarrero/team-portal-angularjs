(function(){
    'use strict';

    angular
        .module('app')
        .controller('projectsCtrl', projectsCtrl)

    /** @ngInject */
    function projectsCtrl($scope, dataSvc, $log){
        
        var projMgr = dataSvc.manageProjs();
        var vm = this;

        vm.data = {};
        
        init();

        function init(){
            vm.data = projMgr.query();
        };

    };

}());

// **** TODO: projectsCtrl ****
// Resolve vm.data before initilizing
// Filter projects by current or past
// Filter a list of team leads
// Add date created/modifed to back end
