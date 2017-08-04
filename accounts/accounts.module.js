angular.module('accounts', ['ngResource', 'devApi'])

    .controller('RegisterController', ['$filter', '$log', '$scope', 'devApiService',
        function ($filter, $log, $scope, devApiService) {

            // Auto select rank based on rate input
            $scope.getRank = function(rate) {
                switch(rate.slice(-3)) {
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
                switch(rate.slice(-2)) {
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
                switch(rate[rate.length - 1]) {
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
    .controller('SailorDetailsController', [
        '$scope', '$state', '$stateParams', 'devApiService',
        function ($scope, $state, $stateParams, devApiService) {

            devApiService.Sailor.get({ id: $stateParams.id }, function (data) {
                $scope.sailor = data;
            })
            // $scope.state = $state.current
            // $scope.params = $stateParams; 
        }])