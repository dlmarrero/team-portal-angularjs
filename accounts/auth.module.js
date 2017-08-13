'use strict';
angular.module('auth', ['ui.router'])
    .factory('authInterceptorService', authInterceptorService)
    .factory('authService', authService)
    .controller('registerController', registerController)
    .controller('loginController', loginController)


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
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $window.alert('You are not authorized to visit this page.  Please log in with sufficient credentials.');
            $state.transitionTo('app.login', {}, {reload: true});
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}


authService.$inject = ['$http', '$q', 'localStorageService', '$log', '$window', '$location']
function authService($http, $q, localStorageService, $log, $window, $location) {

    var serviceBase = 'http://localhost:5000/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration)
            .then(function (response) {
                return response;
            });
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (success) {
            
            localStorageService.set('authorizationData', { token: success.data.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(success);

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
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}


registerController.$inject = ['$scope', '$location', '$timeout', 'authService', '$log', '$state']
function registerController($scope, $location, $timeout, authService, $log, $state) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        password: "",
        confirmPassword: "",
        rate: "",
        rank: "",
        firstName: "",
        lastName: "",
        email: "",
        adsd: "",
        eaos: "",
        prd: "",
        reportDate: "",
        rankDate: "",
        blueBadge: false,
        destUIC: "",
        destCommand: ""
    };

    // Auto select rank based on rate input
    $scope.getRank = function (rate) {
        switch (rate.slice(-3)) {
            case "ENS":
                $scope.registration.rank = "O1";
                break;
            case "TJG":
                $scope.registration.rank = "O2";
                break;
            case "SR":
                $scope.registration.rank = "E1";
                break;
            case "SA":
                $scope.registration.rank = "E2";
                break;
            case "SN":
                $scope.registration.rank = "E3";
                break;
        }
        switch (rate.slice(-2)) {
            case "SR":
                $scope.registration.rank = "E1";
                break;
            case "SA":
                $scope.registration.rank = "E2";
                break;
            case "SN":
                $scope.registration.rank = "E3";
                break;
            case "CS":
                $scope.registration.rank = "E8";
                break;
            case "CM":
                $scope.registration.rank = "E9";
                break;
            case "LT":
                $scope.registration.rank = "O3";
                break;
        }
        switch (rate[rate.length - 1]) {
            case "3":
                $scope.registration.rank = "E4";
                break;
            case "2":
                $scope.registration.rank = "E5";
                break;
            case "1":
                $scope.registration.rank = "E6";
                break;
            case "C":
                $scope.registration.rank = "E7";
                break;
        }

    }

    // PASSWORD VALIDATION
    $scope.passwordStrength = function (password) {

        // Has 6+ characters
        (/^(.{6,})/.test(password)) ? $scope.hasSix = true : $scope.hasSix = false;
        // $log.log((/^(.{6,})/.test(password)));
        // Has lowercase letter
        (/[a-z]/.test(password)) ? $scope.hasLower = true : $scope.hasLower = false;
        // Has uppercase letter
        (/[A-Z]/.test(password)) ? $scope.hasUpper = true : $scope.hasUpper = false;
        // Has digit
        (/\d/.test(password)) ? $scope.hasDigit = true : $scope.hasDigit = false;
        // Has special
        (/[^A-Za-z0-9]/.test(password)) ? $scope.hasSpecial = true : $scope.hasSpecial = false;

        if (!password) {
            $scope.hasSix = false;
            $scope.hasLower = false;
            $scope.hasUper = false;
            $scope.hasDigit = false;
            $scope.hasSpecial = false;
        }

        $scope.validatePassword = function (password) {
            ($scope.hasSix && $scope.hasLower && $scope.hasUpper && $scope.hasDigit && $scope.hasSpecial) ?
                $scope.validPassword = true : $scope.validPassword = false;

            if ($scope.validPassword) {
                $scope.showPwRules = false;
            }
        }

    }

    // Show Username
    if ($scope.registration.firstName && $scope.registration.lastName) {
        return true;
    }


    // REGISTER NEW USER
    $scope.signUp = function () {
        authService.saveRegistration($scope.registration)
            .then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "Registration succssful!  Logging you in...";
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "Failed to register user. " + errors.join(' ');
            });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);

            $scope.loginData = {
                userName: $scope.registration.firstName + '.' + $scope.registration.lastName,
                password: $scope.registration.password
            };

            authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, {reload: true});
            },
            function (error_description) {
                $scope.message = error_description.data.error_description;
            });
            //$location.path('/login');
        }, 2000);
    }
}


loginController.$inject = ['$scope', '$location', 'authService', '$state']
function loginController($scope, $location, authService, $state) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, {reload: true});
            },
            function (error_description) {
                $scope.message = error_description.data.error_description;
            });
    };
}