angular.module('app')
    .factory('dataSvc', dataSvc)

dataSvc.$inject = ['$resource', 'authService', '$log'];
function dataSvc($resource, authService, $log) {
    
    var aspApiUrl = 'http://localhost:5000';
    var authentication = authService.authentication;
    $log.log('auth', authentication)

    return {
        getUsers: getUsers,
        getCurUser: getCurUser,
        manageUser: manageUser,

        addRole: addRole,
        getRoles: getRoles,

        getToDos: getToDos,
        manageToDos: manageToDos,

        managePocs: managePocs
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
};