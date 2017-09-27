(function(){
    'use strict';

    angular
        .module('app')
        .controller('quizGenCtrl', quizGenCtrl);

    /** @ngInject */
    function quizGenCtrl($scope, dataSvc){
        var topicMgr = dataSvc.manageTopics();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();
        
        var vm = this;
        vm.selectedSections = [];
        
        vm.generateQuiz = generateQuiz;
        vm.loadTopic = loadTopic;
        vm.selectSection = selectSection;

        init();

        function init(){
            vm.topics = topicMgr.query();
        }

        function generateQuiz() {
            var quizSelectors = {sections: vm.selectedSections};
            quizGenMgr.save(quizSelectors, function(quiz) {
                vm.quiz = quiz;
            });
        }

        function loadTopic() {
            vm.references = referenceMgr.query({ topicId: vm.selectedTopic.id });
        }

        function selectSection(sect) {
            var i = vm.selectedSections.indexOf(sect);
            if (i === -1) {
                vm.selectedSections.push(sect);
            } else {
                vm.selectedSections.splice(i, 1);
            }
        }
    }

}());