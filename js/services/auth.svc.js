angular.module('app')
.factory('authService', authService);

authService.$inject = ['$http', '$q', 'localStorageService', '$window', '$location', '$state', '$rootScope'];
function authService ($http, $q, localStorageService, $window, $location, $state, $rootScope) {

    var serviceBase = 'http://localhost:5000/';
    // var serviceBase = 'portal';
    
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + '/api/account/register', registration)
            .then(function (response) {
                return response;
            });
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + encodeURIComponent(loginData.userName)  + "&password=" + encodeURIComponent(loginData.password);

        var deferred = $q.defer();

        $http.post(serviceBase + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (success) {
            
            localStorageService.set('authorizationData', { token: success.data.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(success);

            // $rootScope.$broadcast('authUpdate', _authentication);

        },function (error, status) {
            _logOut();
            deferred.reject(error);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

        $state.reload();
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;

}
