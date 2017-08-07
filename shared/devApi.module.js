angular.module('devApi', ['ngResource'])
.factory('devApiService', ['$resource', function($resource) {
    
    var aspApiUrl = 'http://localhost:5000';
    
    service = {};
    
    service.Register = $resource(aspApiUrl + '/api/Account/Register');
    service.Login = $resource(aspApiUrl + '/token', {}, {
        post: {
            method: 'POST',
            isArray: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })

    service.Sailors = $resource(aspApiUrl + '/api/sailors');
    service.Sailor = $resource(aspApiUrl + '/api/sailors/:id');
    
    service.Wsr = $resource(aspApiUrl + '/api/wsr');

    return service;
}])