angular.module('app')
    .factory('dataSvc', dataSvc)

dataSvc.$inject = ['$resource', 'authService'];
function dataSvc($resource, authService) {
    
    var aspApiUrl = 'http://localhost:5000';
    var authentication = authService.authentication;

    return {
        // USERS
        getUsers: getUsers,
        getCurUser: getCurUser,
        manageUser: manageUser,
        // ROLES
        addRole: addRole,
        getRoles: getRoles,
        // TODOS
        getToDos: getToDos,
        manageToDos: manageToDos,
        // POCS
        managePocs: managePocs,
        // PROJECTS
        manageProjs: manageProjs,
        manageTeam: manageTeam
    };




    // **** USER MANAGEMENT ****

    function getUsers() {
        // Get all user data
        return $resource(aspApiUrl + '/api/account/users').query();
    };

    function getCurUser() {
        // Get user data by name (index controller)
        if (authentication.isAuth) {
            return $resource(aspApiUrl + '/api/account?username=:username');
        };
    };


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

    function manageTeam() {
        // SAVE new team member
        // DELETE team member
        // PUT update team member (add team lead)
        return $resource(aspApiUrl + '/api/TeamMembers/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    
};