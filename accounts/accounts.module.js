angular.module('accounts', ['ngResource', 'devApi'])

    // .factory('authService', ['$http', '$q', 'localStorageService', 'devApiService', function($http, $q, localStorageService, devApiService) {

    //     var serviceBase = 'http://localhost:5000'
    //     var authServiceFactory = {};

    //     var _authentication = {
    //         isAuth: false,
    //         userName: ""
    //     };

    //     var _saveRegistration = function (registration) {

    //         _logout();


    //     }

    //     var _login = function(loginData) {

    //         var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    //         var deferred = $q.defer();


    //     }
    // }])

    .factory('authData', [function () {
        var authDataFactory = {};

        var _authentication = {
            IsAuthenticated: false,
            userName: ""
        };

        authDataFactory.authenticationData = _authentication;

        return authDataFactory;
    }])

    .service('AuthenticationService', ['$http', '$q', '$window', '$log',
        function ($http, $q, $window, $log) {
            var tokenInfo;

            this.setTokenInfo = function (data) {
                tokenInfo = data;
                $window.sessionStorage["TokenInfo"] = null;
            }

            this.getTokenInfo = function () {
                return tokenInfo;
            }

            this.removeToken = function () {
                tokenInfo = null;
                $window.sessionStorage["TokenInfo"] = null;
            }

            this.init = function () {
                if ($window.sessionStorage["TokenInfo"]) {
                    tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
                }
            }

            this.setHeader = function (http) {
                delete http.defaults.headers.common['X-Requested-With'];
                if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined) && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                    http.defaults.headers.common['Authorization'] = 'Bearer' + tokenInfo.accessToken;
                    http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
            }

            this.validateRequest = function () {
                var url = serviceBase + '/api/values';
                $log.log(url);
                var deferred = $q.defer();
                $http.get(url).then(function () {
                    this.setHeader($http);
                    deferred.resolve(null);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            this.init();
        }])

    .service('LoginService', ['$http', '$q', 'AuthenticationService', 'authData', '$log',
        function ($http, $q, authenticationService, authData, $log) {
            var userInfo;

            var loginServiceURL = serviceBase + '/token';
            var deviceInfo = [];
            var deferred;

            this.login = function (userName, password) {
                deferred = $q.defer();
                var data = "grant_type=password&username=" + userName + "&password=" + password;
                $log.log(data);
                $http.post(loginServiceURL, data, {
                    headers:
                    { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    var o = response;
                    userInfo = {
                        accessToken: response.access_token,
                        userName: response.userName
                    };
                    $log.log(userInfo)
                    authenticationService.setTokenInfo(userInfo);
                    authData.authenticationData.IsAuthenticated = true;
                    authData.authenticationData.userName = response.userName;
                    deferred.resolve(null);
                })
                    .catch(function (err, status) {
                        authData.authenticationData.IsAuthenticated = false;
                        authData.authenticationData.userName = "";
                        deferred.resolve(err);
                    });
                return deferred.promise;
            }
            this.logOut = function () {
                authenticationService.removeToken();
                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.userName = "";
            }
        }])

    .controller('RegisterController', ['$filter', '$log', '$scope', 'devApiService',
        function ($filter, $log, $scope, devApiService) {

            // Auto select rank based on rate input
            $scope.getRank = function (rate) {
                switch (rate.slice(-3)) {
                    case "ENS":
                        $scope.rank = "O1";
                        break;
                    case "TJG":
                        $scope.rank = "O2";
                        break;
                    case "SR":
                        $scope.rank = "E1";
                        break;
                    case "SA":
                        $scope.rank = "E2";
                        break;
                    case "SN":
                        $scope.rank = "E3";
                        break;
                }
                switch (rate.slice(-2)) {
                    case "SR":
                        $scope.rank = "E1";
                        break;
                    case "SA":
                        $scope.rank = "E2";
                        break;
                    case "SN":
                        $scope.rank = "E3";
                        break;
                    case "CS":
                        $scope.rank = "E8";
                        break;
                    case "CM":
                        $scope.rank = "E9";
                        break;
                    case "LT":
                        $scope.rank = "O3";
                        break;
                }
                switch (rate[rate.length - 1]) {
                    case "3":
                        $scope.rank = "E4";
                        break;
                    case "2":
                        $scope.rank = "E5";
                        break;
                    case "1":
                        $scope.rank = "E6";
                        break;
                    case "C":
                        $scope.rank = "E7";
                        break;
                }

            }

            // PASSWORD VALIDATION
            $scope.passwordStrength = function (password) {

                // Has 6+ characters
                (/^(.{6,})/.test(password)) ? $scope.hasSix = true : $scope.hasSix = false;
                // Has lowercase letter
                (/[a-z]/.test(password)) ? $scope.hasLower = true : $scope.hasLower = false;
                // Has uppercase letter
                (/[A-Z]/.test(password)) ? $scope.hasUpper = true : $scope.hasUpper = false;
                // Has digit
                (/\d/.test(password)) ? $scope.hasDigit = true : $scope.hasDigit = false;
                // Has special
                (/[^A-Za-z0-9]/.test(password)) ? $scope.hasSpecial = true : $scope.hasSpecial = false;

                if (!$scope.password) {
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
            if ($scope.firstname && $scope.lastname) {
                return true;
            }

            // Register user with API
            $scope.submit = function () {

                // Validate form before sending over the wire



                $scope.adsd = new Date($scope.adsd);

                var newUser = new devApiService.Register({
                    Email: $scope.email,
                    Password: $scope.password,
                    ConfirmPassword: $scope.confirmpassword,
                    Rate: $scope.rate,
                    Rank: $scope.rank,
                    FirstName: $scope.firstname,
                    LastName: $scope.lastname,
                    ADSD: $scope.adsd,
                    EAOS: $scope.eaos,
                    PRD: $scope.prd,
                    ReportDate: $scope.reportdate,
                    RankDate: $scope.rankdate,
                    BlueBadge: $scope.bluebadge,
                    DestUIC: $scope.destuic,
                    DestCommand: $scope.destcommand
                });

                $log.log(newUser)

                newUser.$save();
            }

        }])

    .controller('loginController', ['$scope', 'LoginService', '$location', '$log',
        function ($scope, loginService, $location, $log) {
            $log.log(serviceBase);
            
            $scope.loginData = {
                userName: "",
                password: ""
            };

            $scope.login = function () {
                loginService.login($scope.loginData.userName, $scope.loginData.password).then(function (response) {
                    if (response != null && response.error != undefined) {
                        $scope.message = response.error_description;
                    }
                    else {
                        $location.path('/next')
                    }
                });
            }
        }])

    .controller('nextController', ['$scope', 'AuthenticationService', function ($scope, authenticationService) {
        authenticationService.validateRequest();
    }])

    .controller('SailorDetailsController', [
        '$scope', '$state', '$stateParams', 'devApiService',
        function ($scope, $state, $stateParams, devApiService) {

            devApiService.Sailor.get({ id: $stateParams.id }, function (data) {
                $scope.sailor = data;
            })
            // $scope.state = $state.current
            // $scope.params = $stateParams; 
        }])