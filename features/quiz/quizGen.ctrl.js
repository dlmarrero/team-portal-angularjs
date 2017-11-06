(function () {
    'use strict';

    angular
        .module('app')
        .controller('quizGenCtrl', quizGenCtrl);

    /** @ngInject */
    function quizGenCtrl($scope, dataSvc, $log) {
        var topicMgr = dataSvc.manageTopics();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();
        var quizSubMgr = dataSvc.checkQuiz();

        var vm = this;

        vm.quizMode = false;
        vm.quizSubmission = [];
        vm.selectedSections = [];
        vm.numberOfQuestions = 25;

        vm.generateQuiz = generateQuiz;
        vm.gradeQuiz = gradeQuiz;
        vm.loadTopic = loadTopic;
        vm.selectSection = selectSection;

        init();

        function init() {
            vm.topics = topicMgr.query();
        }

        function generateQuiz() {
            vm.showResults = false;
            var quizSelectors = { 
                sections: vm.selectedSections, 
                numberOfQuestions: vm.numberOfQuestions 
            };
            quizGenMgr.save(quizSelectors, function (quiz) {
                vm.quiz = quiz;
                // vm.quizMode = true;
            });
        }

        function gradeQuiz() {
            vm.quizSubmission = [];
            var i = 0, arrLen = vm.quiz.questions.length;
            for (; i < arrLen; i++) {
                var q = vm.quiz.questions[i];
                var newSub = {
                    questionId: q.questionId,
                    sectionId: q.sectionId,
                    selected: q.selected
                };
                vm.quizSubmission.push(newSub);
            }
            var s = { submission: vm.quizSubmission };
            quizSubMgr.send(s, function (data) {
                vm.quizResults = data;
                vm.showResults = true;
                var correct = 0;
                var incorrect = 0;
                for (var i = 0; i < vm.quizResults.length; i++) {
                    var question = vm.quizResults[i];
                    question.selAnswer === question.corAnswer ? correct += 1 : incorrect += 1;
                }
                vm.score = correct / (correct + incorrect) * 100;
            });


        }

        function loadTopic() {
            referenceMgr.query({ topicId: vm.selectedTopic.id }, function (data) {
                vm.references = data;
                var i = 0, arrLen = vm.references.length;
                for (; i < arrLen; i++) {
                    var n = 0, arrLen1 = vm.references[i].sections.length;
                    for (; n < arrLen1; n++) {
                        $log.log('vm.references[i].sections[n]', vm.references[i].sections[n]);
                        vm.references[i].sections[n].selected = true;
                        vm.selectedSections.push(vm.references[i].sections[n]);
                    }
                }
            });

        }

        function selectSection(sect) {
            $log.log('selectSection', selectSection);

            var i = vm.selectedSections.indexOf(sect);
            if (i === -1) {
                vm.selectedSections.push(sect);
            } else {
                vm.selectedSections.splice(i, 1);
            }
        }
    }

}());