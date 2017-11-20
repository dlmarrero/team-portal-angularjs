(function () {
    'use strict';

    angular
        .module('app')
        .controller('trackerChartCtrl', trackerChartCtrl)

    /** @ngInject */
    function trackerChartCtrl(dataSvc) {
        var vm = this;

        // vm.nkoData = [];
        vm.courses = [];
        vm.users = [];
        vm.completionPcts = [];

        init();

        function init() {
            vm.nkoData = dataSvc.getNkos().query((data) => {
                _populateNkoDetail(data);
            });
        }

        function _populateNkoDetail(data) {
            var ctx = document.getElementById("nkoChart");
            var nkoOverviewData = {
                labels: [],
                datasets: [{
                    label: 'Completion Percentage',
                    data: []
                }]
            };

            // This filtering should really take place on backend...
            let courses = data[0].trainingCourses;
            let totalCourses = courses.length;
            for (let i = 0; i < totalCourses; i++) {
                const c = courses[i];
                let course = {
                    title: c.title,
                    courseNum: c.courseNum,
                    type: c.type
                }
                vm.courses.push(course);
            }

            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                vm.users.push(user.userName);
            }

            nkoOverviewData.labels = vm.users;

            for (let i = 0; i < data.length; i++) {
                const courses = data[i].trainingCourses;

                let complete = 0.0;
                for (let i = 0; i < totalCourses; i++) {
                    const c = courses[i];
                    if (c.complete) {
                        complete += 1;
                    }
                }

                vm.completionPcts.push(complete / totalCourses * 100);
            }

            nkoOverviewData.datasets[0].data = vm.completionPcts;

            vm.nkoChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: nkoOverviewData
                // options: options
            });

        }

        // function _populateNkoOverview(data) {
        //     for (let i = 0; i < vm.users.length; i++) {
        //         const user = vm.users[i];

        //     }
        // }

    }

}());