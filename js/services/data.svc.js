angular.module('app')
    .factory('dataSvc', dataSvc);

dataSvc.$inject = ['$resource', 'authService'];
function dataSvc($resource, authService) {
    
    var aspApiUrl = 'http://localhost:5000';
    // // // var aspApiUrl = 'portal';
    var authentication = authService.authentication;
    if (authentication.isAuth) {
        var curUser = $resource(aspApiUrl + '/api/account?username=' + authService.authentication.userName).get();
    };

    return {
        // USERS
        getUsers: getUsers,
        getCurUser: getCurUser,
        manageUser: manageUser,
        getTeamMembers: getTeamMembers,
        teams: ['Virtualization', 'Infrastructure', 'IT Support', 'Training'],
        // ROLES
        addRole: addRole,
        getRoles: getRoles,
        // TODOS
        getToDos: getToDos,
        manageToDos: manageToDos,
        // POCS
        managePocs: managePocs,
        // PROJECTS
        manageAttachments: manageAttachments,
        manageComments: manageComments,
        manageLinks: manageLinks,
        manageProjs: manageProjs,
        manageTasks: manageTasks,
        manageTeam: manageTeam,
        // QUIZ
        manageBulkAdd: manageBulkAdd,
        manageQuestions: manageQuestions,
        manageReferences: manageReferences,
        manageSections: manageSections,
        manageTopics: manageTopics,
        quizGen: quizGen,
        checkQuiz: checkQuiz
    };




    // **** USER MANAGEMENT ****

    function getUsers() {
        // Get all user data
        return $resource(aspApiUrl + '/api/account/users').query();
    };

    function getTeamMembers(team) {
        // Get all members of a team
        return $resource(aspApiUrl + '/api/account/team?team=:team').query({ team: team});
    }

    function getCurUser() {
        if (authentication.isAuth) {
            return curUser
        };
    }

    function manageUser() {
        // GET: single user data by Id,
        // DELETE: delete user
        // PUT: update user
        return $resource(aspApiUrl + '/api/account/user/:id', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** ACCOUNT MANAGEMENT ****

    function addRole() {
        // Add a user to a role
        return $resource(aspApiUrl + '/api/roles/ManageUsersInRole');
    };

    function getRoles() {
        // List of available roles
        return $resource(aspApiUrl + '/api/roles').query();
    };


    // **** TODO ****

    function getToDos(id) {
        // List a user's todos
        return $resource(aspApiUrl + '/api/todos?SailorId=:sailorId').query({ sailorId: id });
    };

    function manageToDos() {
        // DELETE: remove todo
        // QUERY: get a user's toDos
        // UPDATE: update todo
        // SAVE: new todo
        return $resource(aspApiUrl + '/api/todos/:todoId', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** POCs ****

    function managePocs() {
        // GET all pocs
        // SAVE new poc
        // DELETE remove poc
        // UPDATE edit poc
        return $resource(aspApiUrl + '/api/Pocs/:id', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** PROJECTS ****

    function manageAttachments() {
        return $resource(aspApiUrl + '/api/Comments/:id', null, {
            'update': { method: 'PUT' }
        });
    };
    
    function manageComments() {
        return $resource(aspApiUrl + '/api/Comments/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageLinks() {
        return $resource(aspApiUrl + '/api/Links/:id', null, {
            'update': { method: 'PUT' }
        });
    };
    
    function manageProjs() {
        // QUERY all projects
        // SAVE new project
        // DELETE remove project
        // GET single project with details
        // PUT update basic project info
        return $resource(aspApiUrl + '/api/Projects/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageTasks() {
        return $resource(aspApiUrl + '/api/WorkItems/:id', null, {
            'update': { method: 'PUT' }
        });
    };
    
    function manageTeam() {
        // SAVE new team member
        // DELETE team member
        // PUT update team member (add team lead)
        return $resource(aspApiUrl + '/api/TeamMembers/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    // **** QUIZ ****
    function manageBulkAdd() {
        return $resource(aspApiUrl + '/api/Questions/bulkAdd', null, {
            'send': { method: 'POST', isArray: true }
        });
    }

    function manageTopics() {
        return $resource(aspApiUrl + '/api/Topics/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageReferences() {
        return $resource(aspApiUrl + '/api/References/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageSections() {
        return $resource(aspApiUrl + '/api/Sections/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageQuestions() {
        return $resource(aspApiUrl + '/api/Questions/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function quizGen() {
        return $resource(aspApiUrl + '/api/Quiz');
    }

    function checkQuiz() {
        return $resource(aspApiUrl + '/api/Quiz/CheckAnswers', null, {
            'send': { method: 'POST', isArray: true }
        });
    }
};