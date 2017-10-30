(function () {
    'use strict';

    angular
        .module('app')
        .directive('yourQuiz', yourQuiz);

    function yourQuiz() {
        return {
            restrict: 'E',
            templateUrl: 'features/quiz/yourQuiz.html',
        }
    }
}());