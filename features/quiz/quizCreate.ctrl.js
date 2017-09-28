(function () {
    'use strict';

    angular
        .module('app')
        .controller('quizCreateCtrl', quizCreateCtrl);

    /** @ngInject */
    function quizCreateCtrl($scope, $state, $stateParams, $log, dataSvc) {
        var bulkMgr = dataSvc.manageBulkAdd();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var topicMgr = dataSvc.manageTopics();

        var vm = this;

        vm.bulkAdd = null;
        vm.isNewReference = null;
        vm.isNewSection = null;
        vm.isNewTopic = null;
        vm.selectedReference = null;
        vm.selectedSection = null;
        vm.topic = {};

        vm.addQuestion = addQuestion;           // Add new empty question to section
        vm.addReference = addReference;         // Add new empty reference to topic
        vm.addSection = addSection;             // Add new empty section to selected reference
        vm.bulkAddQuestions = bulkAddQuestions;  // Bulk add questions
        vm.createTopic = createTopic;           // Save new topic
        vm.delQuestion = delQuestion;           // Delete a question
        vm.delReference = delReference;         // Delete a reference
        vm.delSection = delSection;             // Delete a section
        vm.delTopic = delTopic;                 // Delete a topic
        vm.setActiveTab = setActiveTab;         // Set active nav pill
        vm.setReference = setReference;         // Set selected reference for sections view
        vm.setSection = setSection;             // Set selected section for questions view
        vm.updateQuestion = updateQuestion;     // Save changes to a question onBlur
        vm.updateReference = updateReference;   // Save changes to a reference onBlur
        vm.updateSection = updateSection;       // Save changes to a section onBlur

        _init();

        function _init() {
            if ($stateParams.topicId !== undefined) {
                topicMgr.get({ id: $stateParams.topicId }, function (data) {
                    vm.topic = data;
                    vm.isNewTopic = false;
                });
            } else {
                vm.topic = {
                    title: '',
                    description: '',
                    references: []
                };
            } // end ifElse
            vm.isNewTopic = vm.topic.id === undefined ? true : false;
            setActiveTab('topic');
        }

        function addQuestion() {
            var newQuestion = {
                sectionId: vm.selectedSection.id,
                question: '',
                answer: ''
            };
            vm.selectedSection.questions.push(newQuestion);
        }

        function addReference() {
            var newReference = {
                topicId: vm.topic.id,
                title: '',
                description: '',
                sections: []
            };
            vm.topic.references.push(newReference);
        }

        function addSection() {
            var newSection = {
                referenceId: vm.selectedReference.id,
                title: '',
                description: '',
                questions: []
            };
            vm.selectedReference.sections.push(newSection);
        }

        function bulkAddQuestions() {
            if (vm.bulkAdd !== '') {
                var bulk = {
                    sectionId: vm.selectedSection.id,
                    bulk: vm.bulkAdd
                };
                bulkMgr.send(bulk, function (data) {
                    vm.selectedSection.questions = data;
                    vm.bulkAdd = '';
                    vm.showBulkAdd = false;
                });
            }
        }

        function createTopic() {
            if (vm.topic.title != '' && vm.isNewTopic) {
                topicMgr.save(vm.topic, function (data) {
                    vm.topic = data;
                    vm.isNewTopic = false;
                    setActiveTab('references');
                });
            } else if (vm.topic.title != '' && !vm.isNewTopic) {
                topicMgr.update({ id: vm.topic.id }, vm.topic, function () {
                    setActiveTab('references');
                });
            }
        }

        function delQuestion(q) {
            var i = vm.selectedSection.questions.indexOf(q);
            if (q.id !== undefined) {
                questionMgr.delete({ id: q.id });
            }
            vm.selectedSection.questions.splice(i, 1);
        }

        function delReference(ref) {
            var i = vm.topic.references.indexOf(ref);
            if (ref.id !== undefined) {
                referenceMgr.delete({ id: ref.id });
            }
            vm.topic.references.splice(i, 1);
        }

        function delSection(sect) {
            var i = vm.selectedReference.sections.indexOf(sect);
            if (sect.id !== undefined) {
                sectionMgr.delete({ id: sect.id });
            }
            vm.selectedReference.sections.splice(i, 1);
        }

        function delTopic(topic) {
            topicMgr.delete({ id: topic.id }, function () {
                _init();
            });
        }

        function setActiveTab(activeTab) {
            vm.activeTab = activeTab;
        }

        function setReference(ref) {
            vm.selectedReference = ref;
            vm.setActiveTab('sections');
        }

        function setSection(sect) {
            vm.selectedSection = sect;
            vm.setActiveTab('questions');
        }

        function updateQuestion(q) {
            if (q.id !== undefined) {
                questionMgr.update({ id: q.id }, q);
            } else if (q.question !== '' && q.answer !== '') {
                questionMgr.save(q, function (data) {
                    var i = vm.selectedSection.questions.indexOf(q);
                    vm.selectedSection.questions[i].id = data.id;
                });
            }
        }

        function updateReference(ref) {
            if (ref.id !== undefined) {
                referenceMgr.update({ id: ref.id }, ref);
            } else if (ref.title !== '') {
                referenceMgr.save(ref, function (data) {
                    var i = vm.topic.references.indexOf(ref);
                    vm.topic.references[i].id = data.id;
                });
            }
        }

        function updateSection(sect) {
            if (sect.id !== undefined) {
                sectionMgr.update({ id: sect.id }, sect);
            } else if (sect.title !== '') {
                sectionMgr.save(sect, function (data) {
                    var i = vm.selectedReference.sections.indexOf(sect);
                    vm.selectedReference.sections[i].id = data.id;
                });
            }
        }
    }

}());