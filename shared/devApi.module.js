angular.module('devApi', ['ngResource'])
.factory('devApiService', ['$resource', function($resource) {
    
    var aspApiUrl = 'http://localhost:5000/api';
    
    service = {};
    
    service.Register = $resource(aspApiUrl + '/Account/Register');

    service.Sailors = $resource(aspApiUrl + '/sailors');
    service.Sailor = $resource(aspApiUrl + '/sailors/:id');
    
    service.Wsr = $resource(aspApiUrl + '/wsr');

    return service;
}])