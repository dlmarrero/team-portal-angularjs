(function(){
    'use strict';

    angular
        .module('app')
        .controller('newProjectCtrl', newProjectCtrl)

    /** @ngInject */
    function newProjectCtrl($scope, dataSvc, $log, $state, $window){
        var projMgr = dataSvc.manageProjs();
        var vm = this;
        
        vm.categories = [];
        vm.addCategory = addCategory;
        vm.removeCategory = removeCategory;
        vm.submitCategory = submitCategory;

        vm.new = {};
        vm.submit = submitProject;
        
        // init();

        // function init(){
        // }

        
        function addCategory(category) {
            if (vm.categories.indexOf(category) == -1) {
                vm.categories.push(category)
                vm.addedCategory = ""
                $window.document.getElementById('newcategory').focus();
            };
        };
        
        function removeCategory(category) {
            var i = vm.categories.indexOf(category);
            vm.categories.splice(i, 1);
        };
        
        function submitCategory(category) {
            if (category == 'other') {
                vm.newCategory = true;
            }
            else if (vm.categories.indexOf(category) == -1 ) {
                vm.categories.push(category);
                vm.submittedCategory = "";
            }
            else {
                vm.categories.pop(category)
                vm.submittedCategory = "";
            };

            vm.addedCategory = "";
        };

        function submitProject() {
            vm.new.categories = "";
            angular.forEach(vm.categories, function (val, i) {
                if (i !== vm.categories.length - 1) {
                    vm.new.categories = vm.new.categories + val + ","
                }
                else {
                    vm.new.categories = vm.new.categories + val
                };
            });
            
            projMgr.save(vm.new, function (data) {
                $log.log('saving')
                $state.transitionTo('app.projects.details', { id: data.id }, { reload: true });
            });
        };
    };

}());