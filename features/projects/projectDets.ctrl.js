(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectDetsCtrl', projectDetsCtrl);

    /** @ngInject */
    function projectDetsCtrl(dataSvc, $stateParams, $log, $scope, $state, $document, $timeout) {
        var attachMgr = dataSvc.manageAttachments();
        var commentMgr = dataSvc.manageComments();
        var linkMgr = dataSvc.manageLinks();
        var projMgr = dataSvc.manageProjs();
        var taskMgr = dataSvc.manageTasks();
        var teamMgr = dataSvc.manageTeam();

        $scope.assignedUsers = [];
        $scope.curUser = dataSvc.getCurUser();
        $scope.newComment = {};
        $scope.newLink = {};
        $scope.newTask = {};
        $scope.showDetails = false;
        $scope.taskSelected = null;
        // $scope.teamFeedback = ""
        $scope.teams = dataSvc.teams;
        $scope.teamMembers = [];

        // $scope.addTeamMembers = addTeamMembers;     // Add a user to a project
        $scope.assignTask = assignTask;             // Assign a user to a task
        $scope.delAssignment = delAssignment;       // Delete a user from a task assignment
        $scope.delComment = delComment;             // Delete a comment
        $scope.delLink = delLink;                   // Delete a link
        $scope.delProject = delProject;             // Delete a project
        $scope.delTask = delTask;                   // Delete a task
        // $scope.delTeamMember = delTeamMember;       // Remove team member from project
        $scope.projectComplete = projectComplete;   // Mark project complete
        $scope.saveAssignments = saveAssignments;   // Save users assigned to a task 
        $scope.saveComment = saveComment;           // Save a new comment
        $scope.saveResource = saveResource;         // Save a new resource
        $scope.saveTask = saveTask;                 // Save a new task
        $scope.taskComplete = taskComplete;          // Mark task complete
        $scope.toggleDetails = toggleDetails;       // Show/hide task details
        $scope.toggleLead = toggleLead;             // Toggle user as a project lead
        $scope.unassignTask = unassignTask;         // Remove a user from a task
        $scope.updateProj = updateProj;             // Save changes to project details
        $scope.uploadFiles = uploadFiles;           // Upload file attachments

        init();

        function init() {
            if ($stateParams.id) {
                $scope.project = projMgr.get({ id: $stateParams.id }, function (project) {
                    populateChart(project);
                    $scope.newTask = {
                        title: "",
                        description: "",
                        priority: "Normal",
                        projectId: project.id
                    };
                    $scope.teamMembers = dataSvc.getTeamMembers(project.team);
                });
            } else {
                $scope.newTask = {
                    title: "",
                    description: "",
                    priority: "Normal",
                    projectId: $scope.project.id
                };
                populateChart($scope.project);
                $scope.teamMembers = dataSvc.getTeamMembers($scope.project.team);
            }
        }

        function populateChart(project) {
            // Set up work items chart
            $scope.chart = [];
            $scope.labels = ["Complete", "Incomplete"];
            $scope.complete = 0;
            $scope.incomplete = 0;
            angular.forEach(project.workItems, function (item) {
                if (item.complete) {
                    $scope.complete += 1;
                }
                else {
                    $scope.incomplete += 1;
                };
            });
            $scope.chart.push($scope.complete);
            $scope.chart.push($scope.incomplete);
        }

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
        }

        function assignTask(user) {
            $scope.assignedUsers.push(user);
            console.log("in assignTask", $scope.assignedUsers)
        }
        // Testing task assignment after task creation
        $scope.a = a;
        function a(user, task) {
            if (user) {
                var submission = {
                    workItemId: task.id,
                    sailorId: user.id,
                    userName: user.userName,
                    rateName: user.rateName
                };

                var taskIndex = $scope.project.workItems.indexOf(task);

                teamMgr.save(submission, function (data) {
                    $scope.project.workItems[taskIndex].assignedUsers.push(data);
                });
            }
        }

        function delAssignment(teamMember, task) {
            teamMgr.delete({ id: teamMember.id }, function () {
                var t = $scope.project.workItems.indexOf(task);
                var u = $scope.project.workItems[t].assignedUsers.indexOf(teamMember);
                $log.log('$scope.project.workItems[t].assignedUsers.length', $scope.project.workItems[t].assignedUsers.length);

                // $timeout(function() {
                if ($scope.project.workItems[t].assignedUsers.length === 1) {
                    $scope.project.workItems[t].assignedUsers = [];
                } else {
                    $scope.project.workItems[t].assignedUsers.splice(u, 1);
                    $log.log('spliced', $scope.project.workItems[t].assignedUsers);
                }
                $scope.taskSelected = null;
                // })
            });
        }

        function delComment(id) {
            commentMgr.delete({ id: id }, function () {
                $state.reload();
            });
        }

        function delLink(id) {
            linkMgr.delete({ id: id }, function (data) {
                var i = $scope.project.links.indexOf(data);
                $scope.project.links.splice(i, 1);
            });
        }

        function delProject() {
            projMgr.delete({ id: $scope.project.id }, function () {
                $state.transitionTo('app.projects', {}, { reload: true });
            });
        }

        function delTask(task) {
            taskMgr.delete({ id: task.id }, function () {
                var i = $scope.project.workItems.indexOf(task);
                $scope.project.workItems.splice(i, 1);
            });
        }

        function delTeamMember(id) {
            teamMgr.delete({ id: id }, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        }

        function projectComplete(val) {
            $scope.project.complete = val;
            projMgr.update({ id: $scope.project.id }, $scope.project);
        }

        function saveAssignments(workItemId) {
            angular.forEach($scope.assignedUsers, function (user) {
                var submission = {
                    workItemId: workItemId,
                    sailorId: user.id,
                    userName: user.userName,
                    rateName: user.rateName
                };
                teamMgr.save(submission, function (data) {
                    // var i = $scope.project.workItems.length-1
                    // $scope.project.workItems[i].assignedUsers.push(data);
                });
            });
            $state.reload();
            
        }

        function saveComment(workItem) {
            $scope.newComment.author = $scope.curUser.rateName;
            $scope.newComment.created = new Date();
            commentMgr.save($scope.newComment, function (data) {
                $state.reload();
            });
        }

        function saveResource() {
            if ($scope.newLink.url != null) {
                $scope.newLink.projectId = $scope.project.id;
                linkMgr.save($scope.newLink, function (data) {
                    $scope.project.links.push(data);
                });
            }
        }

        function saveTask() {
            taskMgr.save($scope.newTask, function (response) {
                
                $scope.project.workItems.push(response);
                // saveAssignments(response.id);
                // $scope.incomplete++;
                // $scope.chart = [];
                // $scope.chart.push($scope.complete);
                // $scope.chart.push($scope.incomplete);
                // $state.reload();
            });
        }

        function taskComplete(task, val) {
            task.complete = val;
            taskMgr.update({ id: task.id }, task, function () {
                init();
            });
        }

        function toggleDetails() {
            $scope.showDetails = !$scope.showDetails;
        }

        function toggleLead(user) {
            if (user.projectLead) {
                user.projectLead = false;
            }
            else {
                user.projectLead = true;
            };
            teamMgr.update({ id: user.id }, user, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        }

        function unassignTask(user, index) {
            $scope.assignedUsers.splice(index, 1);
        }

        function updateProj(assignedTeam) {
            $scope.editTitle = false;
            $scope.editDescription = false;
            projMgr.update({ id: $scope.project.id }, $scope.project, function (project) {
                // $scope.teamFeedback = "Successfully assigned to " + project.team + " team"
                $scope.editTeam = false;
            });
        }

        function uploadFiles(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function (file) {
                // attachMgr.save(file)
                $log.log(file);

                // file.upload = Upload.upload({
                //     url: 'http://localhost:5000/api/Attachments',
                //     data: { file: file }
                // });

                // file.upload.then(function (response) {
                //     $timeout(function () {
                //         file.result = response.data;
                //     });
                // }, function (response) {
                //     if (response.status > 0)
                //         $scope.errorMsg = response.status + ': ' + response.data;
                // }, function (evt) {
                //     file.progress = Math.min(100, parseInt(100.0 *
                //         evt.loaded / evt.total));
                // });
            });
        }
    }

}());