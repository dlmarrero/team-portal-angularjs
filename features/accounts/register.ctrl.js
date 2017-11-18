angular.module('app')
    .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$scope', '$location', '$timeout', 'authService', '$state', '$rootScope', '$filter'];
function registerCtrl($scope, $location, $timeout, authService, $state, $rootScope, $filter) {

    $scope.getRank = getRank;
    $scope.passwordStrength = passwordStrength;
    $scope.signUp = signUp;
    $scope.startTimer = startTimer;

    $scope.validForm = $scope.validCity &&
        $scope.validEmail &&
        $scope.validFName &&
        $scope.validLName &&
        $scope.validName &&
        $scope.validPassword &&
        $scope.validPassConf &&
        $scope.validPhone &&
        $scope.validRank &&
        $scope.validRate &&
        $scope.validState &&
        $scope.validStreet &&
        $scope.validZip &&
        $scope.validAdsd &&
        $scope.validHeaos &&
        $scope.validSeaos &&
        $scope.validPrd &&
        $scope.validReportDate &&
        $scope.validTir &&
        $scope.validUic &&
        $scope.validDest;

    $scope.validateAdsd = validateAdsd;
    $scope.validateHeaos = validateHeaos;
    $scope.validateSeaos = validateSeaos;
    $scope.validatePrd = validatePrd;
    $scope.validateReportDate = validateReportDate;
    $scope.validateTir = validateTir;
    $scope.validateUic = validateUic;
    $scope.validateDest = validateDest;
    $scope.validateCity = validateCity;
    $scope.validateEmail = validateEmail;
    $scope.validateFName = validateFName;
    $scope.validateLName = validateLName;
    $scope.validatePassConf = validatePassConf;
    $scope.validatePassword = validatePassword;
    $scope.validatePhone = validatePhone;
    $scope.validateRank = validateRank
    $scope.validateRate = validateRate;
    $scope.validateState = validateState;
    $scope.validateStreet = validateStreet;
    $scope.validateZip = validateZip;

    $scope.validateForm = validateForm;

    $scope.registration = {};
    $scope.registration.blueBadge = false; // Just default this to false on backend


    // TRY INSTEAD TO WRITE A HELPER FUNCTION WHICH SETS MESSAGE FOR THE SCOPE
    // $scope.$on('registerFeedback', function (event, data) {
    //     $rootScope.registerMessage = data.feedback;
    //     $rootScope.savedSuccessfully = data.savedSuccessfully;
    // })


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
            $scope.validPassword = false;
        }
        else {
            validatePassword(password);
        };
    };

    function validateAdsd(date) {
        if (date) {
            $scope.validAdsd = _validateDate(date);
        } else {
            $scope.validAdsd = false;
        }

        if ($scope.validAdsd) {
            validateForm();
        }
    }

    function validateHeaos(date) {
        if (date) {
            $scope.validHeaos = _validateDate(date);
        } else {
            $scope.validHeaos = false;
        }

        if ($scope.validHeaos) {
            validateForm();
        }
    }

    function validateSeaos(date) {
        if (date) {
            $scope.validSeaos = _validateDate(date);
        } else {
            $scope.validSeaos = false;
        }

        if ($scope.validSeaos) {
            validateForm();
        }
    }

    function validatePrd(date) {
        if (date) {
            $scope.validPrd = _validateDate(date);
        } else {
            $scope.validPrd = false;
        }

        if ($scope.validPrd) {
            validateForm();
        }
    }

    function validateReportDate(date) {
        if (date) {
            $scope.validReportDate = _validateDate(date);
        } else {
            $scope.validReportDate = false;
        }

        if ($scope.validReportDate) {
            validateForm();
        }
    }

    function validateTir(date) {
        if (date) {
            $scope.validTir = _validateDate(date);
        } else {
            $scope.validTir = false;
        }

        if ($scope.validTir) {
            validateForm();
        }
    }

    function validateUic(uic) {
        if (uic) {
            var regEx = /\d{5}/
            $scope.validUic = regEx.test(uic)
        } else {
            $scope.validUic = false;
        }

        if ($scope.validUic) {
            validateForm();
        }
    }

    function validateDest(dest) {
        if (dest) {
            $scope.validDest = true;
        } else {
            $scope.validDest = false;
        }

        if ($scope.validDest) {
            validateForm();
        }
    }

    function validateCity(city) {
        var regEx = /[A-Za-z]{2,}[^\d]/;

        if (city) {
            $scope.validCity = regEx.test(city);
        } else {
            $scope.validCity = false;
        }

        if ($scope.validCity) {
            $scope.registration.city = $filter('capitalize')(city);
            validateForm();
        }
    };

    function _validateDate(date) {
        var regEx = /\W\d{4}.\d{2}.\d{2}/
        return regEx.test(date);
    }

    function validateEmail(email) {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.validEmail = regEx.test(email);

        if ($scope.validEmail) {
            $scope.registration.email = $filter('lowercase')(email)
            validateForm();
        }
    };

    function validateFName(name) {
        $scope.validFName = _validateName(name)

        if ($scope.validFName) {
            $scope.registration.firstName = $filter('capitalize')(name);
            validateForm();
        }
    };

    function validateLName(name) {
        $scope.validLName = _validateName(name)

        if ($scope.validLName) {
            $scope.registration.lastName = $filter('capitalize')(name);
            validateForm();
        }

    };

    function _validateName(name) {
        var regEx = /^[A-Za-z]+$/
        if (name) {
            return regEx.test(name);
        } else {
            return false;
        }
    };

    function validatePassConf(password, confirm) {
        $scope.validPassConf = (password === confirm);
        if ($scope.validPassConf) {
            validateForm();
        }
    };

    function validatePassword(password) {
        $scope.validPassword = $scope.hasSix && $scope.hasLower && $scope.hasUpper && $scope.hasDigit && $scope.hasSpecial;

        if ($scope.validPassword) {
            $scope.showPwRules = false;
            validateForm();
        }
    };

    function validatePhone(phone) {
        if (phone) {
            phone = phone.replace(/[^0-9]+/g, '');

            var regEx = /^\d{10,11}$/
            $scope.validPhone = regEx.test(phone);

            if ($scope.validPhone) {
                $scope.registration.phoneNumber = phone;
                validateForm();
            }

        } else {
            $scope.validPhone = false;
        }
    }

    function validateRank(rank) {
        rank == null ? $scope.validRank = true : $scope.validRank = false;

        if ($scope.validRank) {
            validateForm();
        }
    }

    function validateRate(rate) {
        if (rate) {
            var rate = rate.toUpperCase();
            var regEx = /(^[A-Z]{2,3}(SN|SA|SR|[123]|C|CS|CM)$)|^ENS$|^LTJG$|^LT$/;

            $scope.validRate = regEx.test(rate);
        } else {
            $scope.validRate = false;
        }

        if ($scope.validRate) {
            // Uppercase
            $scope.registration.rate = rate;

            getRank(rate);
            $scope.validRank = true;

            validateForm();
        }
    };

    function validateState(state) {
        var regEx = /^[A-Za-z]{2}$/

        if (state) {
            $scope.validState = regEx.test(state);
        } else {
            $scope.validState = false;
        }

        if ($scope.validState) {
            $scope.registration.state = $filter('uppercase')(state);
            validateForm();
        }
    }

    function validateStreet(street) {
        var regEx = /\d+[A-Za-z]? \w+/;
        if (street) {
            $scope.validStreet = regEx.test(street);
        } else {
            $scope.validStreet = false;
        }

        if ($scope.validStreet) {
            validateForm();
        }
    }

    function validateZip(zip) {
        var regEx = /\d{5}/;

        if (zip) {
            $scope.validZip = regEx.test(zip);
        } else {
            $scope.validZip = false;
        }

        if ($scope.validZip) {
            validateForm();
        }
    }

    function validateForm() {
        if ($scope.validCity &&
            $scope.validEmail &&
            $scope.validFName &&
            $scope.validLName &&
            $scope.validName &&
            $scope.validPassword &&
            $scope.validPassConf &&
            $scope.validPhone &&
            $scope.validRank &&
            $scope.validRate &&
            $scope.validState &&
            $scope.validStreet &&
            $scope.validZip &&
            $scope.validAdsd &&
            $scope.validHeaos &&
            $scope.validSeaos &&
            $scope.validPrd &&
            $scope.validReportDate &&
            $scope.validTir &&
            $scope.validUic &&
            $scope.validDest) {
            $scope.validForm = true;
        };

        console.log($scope.validForm);
    }

    // REGISTER NEW USER
    function signUp() {
        if (validForm) {
            authService.saveRegistration($scope.registration)
                .then(function (response) {
                    $rootScope.$broadcast('registerFeedback', { feedback: "Registration succssful!  Logging you in...", savedSuccessfully: true });
                    startTimer();
                },
                function (response) {
                    var errors = [];
                    for (var key in response.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        };
                    };
                    var message = "Failed to register user. " + errors.join(' ');
                    $rootScope.$broadcast('registerFeedback', { feedback: message, savedSuccessfully: false });
                });
        }
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
        }, 1000);
    };
};
