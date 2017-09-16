(function(){
    'use strict';

    angular
        .module('app')
        .controller('quizCreateCtrl', quizCreateCtrl)

    /** @ngInject */
    function quizCreateCtrl($scope, dataSvc){
        var topicMgr = dataSvc.manageTopics;
        var referenceMgr = dataSvc.manageReferences;
        var sectionMgr = dataSvc.manageSections;
        var questionMgr = dataSvc.manageQuestions;
        var quizGenMgr = dataSvc.quizGen;

        var vm = this;

        vm.delQuestion = delQuestion;
        vm.delReference = delReference;
        vm.delSection = delSection;
        vm.delTopic = delTopic;
        vm.editQuestion = editQuestion;
        vm.editReference = editReference;
        vm.editSection = editSection;
        vm.editTopic = editTopic;
        vm.saveQuestion = saveQuestion;
        vm.saveReference = saveReference;
        vm.saveSection = saveSection;
        vm.saveTopic = saveTopic;

        init();

        function init(){
            vm.topics = topicMgr.query();
        }

    }

}());