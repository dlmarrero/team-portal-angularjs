(function () {
    'use strict';

    angular
        .module('app')
        .directive('trackerChart', trackerChart);


    /** @ngInject */
    function trackerChart() {
        return {
            bindToController: true,
            controller: 'trackerChartCtrl',
            controllerAs: 'vm',
            templateUrl: 'features/dashboard/charts/trackerChart.html',
            restrict: 'E'
        }
    }

}());