angular.module('app')
    .factory('apiCall', ['$resource', function ($resource) {

        var aspApiUrl = 'http://localhost:5000';

        var svc = {};

        // **** REPORTS ****
        // USER RELATED API CALLS
        // Get all user data
        svc.Sailors = $resource(aspApiUrl + '/api/account/users');

        // GET: single user data by Id,
        // DELETE: delete user
        // PUT: update user
        svc.Sailor = $resource(aspApiUrl + '/api/account/user/:id', null, {
            'update': { method:'PUT' }
        });

        // GET: single user by username
        svc.GetUserByName = $resource(aspApiUrl + '/api/account?username=:username');
        
        //ACCOUNT MANAGEMENT
        // GET: list of available roles
        svc.Roles = $resource(aspApiUrl + '/api/roles');

        // POST: add a role to a user
        svc.AddRole = $resource(aspApiUrl + '/api/roles/ManageUsersInRole');


        // **** TODO ****
        // GET a user's todos
        svc.ToDos = $resource(aspApiUrl + '/api/todos?SailorId=:sailorId');

        // Post a new todo
        svc.AddToDo = $resource(aspApiUrl + '/api/todos');

        // DELETE: remove todo
        // GET: get single todo (ever used?)
        // UPDATE: update todo
        svc.ToDo = $resource(aspApiUrl + '/api/todos/:todoId', null, {
            'update': { method:'PUT' }
        });

        return svc;
    }])