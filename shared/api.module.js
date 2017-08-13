angular.module('api', ['ngResource'])
    .factory('apiCall', ['$resource', function ($resource) {

        var aspApiUrl = 'http://localhost:5000';

        service = {};

        // **** REPORTS ****
        // USER RELATED API CALLS
        // Get all user data
        service.Sailors = $resource(aspApiUrl + '/api/account/users')

        // GET: single user data by Id,
        // DELETE: delete user
        // PUT: update user
        service.Sailor = $resource(aspApiUrl + '/api/account/user/:id', null, {
            'update': { method:'PUT' }
        });

        // GET: single user by username
        service.GetUserByName = $resource(aspApiUrl + '/api/account?username=:username');
        
        //ACCOUNT MANAGEMENT
        // GET: list of available roles
        service.Roles = $resource(aspApiUrl + '/api/roles')

        // POST: add a role to a user
        service.AddRole = $resource(aspApiUrl + '/api/roles/ManageUsersInRole');

        return service;
    }])