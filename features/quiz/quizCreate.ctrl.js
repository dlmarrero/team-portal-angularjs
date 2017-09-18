(function(){
    'use strict';

    angular
        .module('app')
        .controller('quizCreateCtrl', quizCreateCtrl);

    /** @ngInject */
    function quizCreateCtrl($scope, $state, dataSvc){
        var topicMgr = dataSvc.manageTopics();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();

        var vm = this;

        vm.references = [];

        vm.addReference = addReference;
        vm.createTopic = createTopic;
        // vm.delQuestion = delQuestion;
        // vm.delReference = delReference;
        // vm.delSection = delSection;
        // vm.delTopic = delTopic;
        // vm.editQuestion = editQuestion;
        // vm.editReference = editReference;
        // vm.editSection = editSection;
        // vm.editTopic = editTopic;
        // vm.saveQuestion = saveQuestion;
        // vm.saveReference = saveReference;
        // vm.saveSection = saveSection;
        // vm.saveTopic = saveTopic;

        init();

        function init(){
            vm.topic = {
                title: '',
                description: '',
                references: []
            };
        }

        function addReference() {
            vm.topic.references.push({
                title: '',
                description: '',
                sections: []
            });
        }

        function createTopic() {
            if (vm.topic.title != '') {
                topicMgr.save(vm.topic, function(data) {
                    $state.go('app.quiz.create.refs', {topicId: data.id});
                });
            }
        }
    }

}());