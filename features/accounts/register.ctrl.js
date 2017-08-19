angular.module('app')
    .controller('registerCtrl', registerCtrl)

registerCtrl.$inject = ['$scope', '$location', '$timeout', 'authService', '$state']
function registerCtrl($scope, $location, $timeout, authService, $state) {

    $scope.getRank = getRank;
    $scope.message = "";
    $scope.passwordStrength = passwordStrength;
    $scope.registration = {};
    $scope.registration.blueBadge = false; // Just default this to false on backend
    $scope.savedSuccessfully = false;
    $scope.signUp = signUp;
    $scope.startTimer = startTimer;
    $scope.validatePassword = validatePassword;


    function getRank(rate) {
        // Auto select rank based on rate input
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
        };
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
        };
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
        };
    };


    function passwordStrength(password) {
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

        if (!password) {
            $scope.hasSix = false;
            $scope.hasLower = false;
            $scope.hasUper = false;
            $scope.hasDigit = false;
            $scope.hasSpecial = false;
        }
        else {
            validatePassword(password);
        };
    };


    function validatePassword(password) {
        ($scope.hasSix && $scope.hasLower && $scope.hasUpper && $scope.hasDigit && $scope.hasSpecial) ?
            $scope.validPassword = true : $scope.validPassword = false;

        if ($scope.validPassword) {
            $scope.showPwRules = false;
        };
    };


    // REGISTER NEW USER
    function signUp() {
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
                    };
                };
                $scope.message = "Failed to register user. " + errors.join(' ');
            });
    };

    function startTimer() {
        var timer = $timeout(function () {
            $timeout.cancel(timer);

            $scope.loginData = {
                userName: $scope.registration.firstName + '.' + $scope.registration.lastName,
                password: $scope.registration.password
            };

            authService.login($scope.loginData)
                .then(function (response) {
                    $state.transitionTo('app.main', {}, { reload: true });
                },
                function (error_description) {
                    $scope.message = error_description.data.error_description; // Fix this error syntax
                });
        }, 2000);
    };
};
