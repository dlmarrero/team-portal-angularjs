(function(){
    'use strict';

    angular
        .module('app')
        .controller('projectDetsCtrl', projectDetsCtrl)

    /** @ngInject */
    function projectDetsCtrl(dataSvc, $stateParams, $log, $scope){
        var projMgr = dataSvc.manageProjs();
        
        $scope.project = {};
        $scope.chart = []
        $scope.labels = ["Complete", "Incomplete"]
        
        init();

        function init(){
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

                $scope.totalItems = 5;
                
                //$scope.chart.push(wk)
            })
        }

    }

}());