angular.module('app')
    .factory('authInterceptorService', authInterceptorService);

authInterceptorService.$inject = ['$q', '$location', 'localStorageService', '$window', '$state']
function authInterceptorService($q, $location, localStorageService, $window, $state) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;

        }

        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $window.alert('You are not authorized to visit this page.  Please log in with sufficient credentials.');
            $state.transitionTo('app.login', {}, { reload: true });
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;

} 