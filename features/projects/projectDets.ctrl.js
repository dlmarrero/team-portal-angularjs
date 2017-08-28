(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectDetsCtrl', projectDetsCtrl)

    /** @ngInject */
    function projectDetsCtrl(dataSvc, $stateParams, $log, $scope, $state, $document) {
        var commentMgr = dataSvc.manageComments();
        var linkMgr = dataSvc.manageLinks();
        var projMgr = dataSvc.manageProjs();
        var taskMgr = dataSvc.manageTasks();
        var teamMgr = dataSvc.manageTeam();
        var attachMgr = dataSvc.manageAttachments();

        $scope.assignedUsers = [];
        $scope.curUser = dataSvc.getCurUser();
        $scope.newComment = {};
        $scope.newLink = {};
        $scope.newTask = {};
        $scope.project = {};
        $scope.showDetails = false;
        $scope.users = dataSvc.getUsers();

        $scope.addTeamMembers = addTeamMembers;     // Add a user to a project
        $scope.assignTask = assignTask;             // Assign a user to a ask
        $scope.delComment = delComment;             // Delete a comment
        $scope.delLink = delLink;                   // Delete a link
        $scope.delProject = delProject;             // Delete a project
        $scope.delTeamMember = delTeamMember;       // Remove team member from project
        $scope.projectComplete = projectComplete;   // Mark project complete
        $scope.saveAssignments = saveAssignments;   // Save users assigned to a task 
        $scope.saveComment = saveComment;           // Save a new comment
        $scope.saveResource = saveResource;         // Save a new resource
        $scope.saveTask = saveTask;                 // Save a new task
        $scope.taskComplete = taskComplete          // Mark task complete
        $scope.toggleDetails = toggleDetails;       // Show/hide task details
        $scope.toggleLead = toggleLead;             // Toggle user as a project lead
        $scope.updateProj = updateProj;             // Save changes to project details
        $scope.unassignTask = unassignTask;         // Remove a user from a task

        init();

        function init() {
            // Hide add team member dialog by default
            $scope.addTeamMember = false;

            $scope.project = projMgr.get({ id: $stateParams.id }, function (data) {
                // Get project data and set up work items chart
                $scope.chart = [];
                $scope.labels = ["Complete", "Incomplete"];
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

                // Initilize newTask properties
                $scope.newTask = {
                    title: "",
                    description: "",
                    priority: "Normal",
                    projectId: data.id
                }
            });
        };

        function addTeamMembers(user) {
            var teamMember = {
                projectId: $scope.project.id,
                sailorId: user.id,
                userName: user.userName,
                rateName: user.rateName
            };
            teamMgr.save(teamMember, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        };

        function assignTask(user) {
            $scope.assignedUsers.push(user);
        };

        function delComment(id) {
            commentMgr.delete({ id: id }, function () {
                $state.reload();
            });
        };

        function delLink(id) {
            linkMgr.delete({ id: id }, function (data) {
                var i = $scope.project.links.indexOf(data);
                $scope.project.links.splice(i, 1);
            });
        };
        
        function delProject() {
            projMgr.delete({ id: $scope.project.id }, function () {
                $state.transitionTo('app.projects', {}, { reload: true });
            });
        };

        function delTeamMember(id) {
            teamMgr.delete({ id: id }, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        };

        function projectComplete(val) {
            $scope.project.complete = val;
            projMgr.update({ id: $scope.project.id }, $scope.project);
        };

        function saveAssignments(workItemId) {
            angular.forEach($scope.assignedUsers, function (user) {
                var submission = {
                    workItemId: workItemId,
                    sailorId: user.id,
                    userName: user.userName,
                    rateName: user.rateName
                };
                teamMgr.save(submission);
            });
        };

        function saveComment(workItem) {
            $scope.newComment.author = $scope.curUser.rateName
            $scope.newComment.created = new Date();
            commentMgr.save($scope.newComment, function (data) {
                $state.reload();
            });
        };

        function saveResource() {
            if ($scope.newLink.url != null) {
                $scope.newLink.projectId = $scope.project.id;
                linkMgr.save($scope.newLink, function (data) {
                    $scope.project.links.push(data)
                });
            };
            if ($scope.attachment != null) {
                var test = {
                    projectId: $scope.project.id,
                    title: 'test',
                    file: $scope.attachment
                };
                $log.log(test);
                attachMgr.save(test);
            };
        };
        
        function saveTask() {
            taskMgr.save($scope.newTask, function (response) {
                saveAssignments(response.id);
                init();
            });
        };

        function taskComplete(task, val) {
            task.complete = val;
            taskMgr.update({ id: task.id }, task, function () {
                init();
            });
        };

        function toggleDetails() {
            $scope.showDetails = !$scope.showDetails;
        };

        function toggleLead(user) {
            if (user.projectLead) {
                user.projectLead = false;
            }
            else {
                user.projectLead = true;
            };
            teamMgr.update({ id: user.id }, user, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id })
            });
        };

        function unassignTask(user, index) {
            $scope.assignedUsers.splice(index, 1);
        };

        function updateProj() {
            $scope.editTitle = false;
            $scope.editDescription = false;
            projMgr.update({ id: $scope.project.id }, $scope.project);
        };
    };

}());