describe('registerCtrl', function () {

    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }))

    describe('validateAdsd', function () {
        it('sets validADSD to true if ADSD is a valid DateTime', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateAdsd('"+020999-11-07T05:00:00.000Z"');
            expect($scope.validAdsd).toBe(false);
            $scope.validateAdsd('"2017-11-03T04:00:00.000Z"');
            expect($scope.validAdsd).toBe(true);
        })
    })

    describe('validateCity', function () {
        it('sets validCity to true if City is at least two letters long, and only alphabetic', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateCity('As1a');
            expect($scope.validCity).toBe(false);
            $scope.validateCity('A');
            expect($scope.validCity).toBe(false);

            $scope.validateCity('Fort Meade');
            expect($scope.validCity).toBe(true);
            $scope.validateCity('Hanover');
            expect($scope.validCity).toBe(true);
        })
    })

    describe('validateRate', function () {
        it('sets validRate to true if rate matches regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateRate('CTNSN');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('ITSA');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('ctnsr');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('CTN3');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('IT2');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('ctn1');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('CTRC');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('ENS');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('ltjg');
            expect($scope.validRate).toBe(true);
            $scope.validateRate('LT');
            expect($scope.validRate).toBe(true);
        })

        it('sets validRate to false if rate does not match regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            var invalidRates = ['CTN', 'IT', 'CTR', 'O1'];

            for (var i in invalidRates) {
                $scope.validateRate(invalidRates[i]);
                expect($scope.validRate).toBe(false);
            }
        })
    })

    describe('_validateName', function () {
        it('returns false if there is a non-alphabetic or empty input for first name', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            var inputs = [null, '$mith', 'C0dy', 'Cody']

            $scope.validateFName(null);
            expect($scope.validFName).toBe(false);
            $scope.validateFName('$mith');
            expect($scope.validFName).toBe(false);
            $scope.validateFName('C0dy');
            expect($scope.validFName).toBe(false);
            $scope.validateFName('');
            expect($scope.validFName).toBe(false);
        })

        it('returns true if there is a strictly alphabetic input for first name', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateFName('Mike');
            expect($scope.validFName).toBe(true);
            $scope.validateFName('steve');
            expect($scope.validFName).toBe(true);
        })

        it('returns false if there is a non-alphabetic or empty input for last name', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            var inputs = [null, '$mith', 'C0dy']

            for (var i in inputs) {
                $scope.validateLName('');
                expect($scope.validLName).toBe(false);
                $scope.validateLName(null);
                expect($scope.validLName).toBe(false);
                $scope.validateLName("'");
                expect($scope.validLName).toBe(false);
                $scope.validateLName("$mith");
                expect($scope.validLName).toBe(false);
                $scope.validateLName("C0dy");
                expect($scope.validLName).toBe(false);
            }
        })

        it('returns true if there is a strictly alphabetic input for last name', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            var inputs = ['Mike', 'steve']

            for (var i in inputs) {
                $scope.validateLName(inputs[i]);
                expect($scope.validLName).toBe(true);
            }
        })
    })

    describe('validateEmail', function () {
        it('sets valid e-mail to false if an invalid e-mail has been entered', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateEmail('@navy.mil');
            expect($scope.validEmail).toBe(false);
            $scope.validateEmail('my.mail');
            expect($scope.validEmail).toBe(false);
            $scope.validateEmail('me@ you.com');
            expect($scope.validEmail).toBe(false);
            $scope.validateEmail('you @me.com');
            expect($scope.validEmail).toBe(false);
            $scope.validateEmail('this@that. com');
            expect($scope.validEmail).toBe(false);
            $scope.validateEmail('that@this .com');
            expect($scope.validEmail).toBe(false);
        })

        it('sets valid e-mail to true if a valid e-mail has been entered', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateEmail('a.user@navy.mil')
            expect($scope.validEmail).toBe(true)
            $scope.validateEmail('a.user.1@nsa.gov')
            expect($scope.validEmail).toBe(true)
            $scope.validateEmail('auser_1@nsa.gov')
            expect($scope.validEmail).toBe(true)
            $scope.validateEmail('auser_1@nsa.gov')
            expect($scope.validEmail).toBe(true)
            $scope.validateEmail('CAPSGUY@NAVY.MILS')
            expect($scope.validEmail).toBe(true)
        })
    })

    describe('validatePassConf', function () {
        it('sets validPassConf to true if passwords match', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validatePassConf('P@ssw0rd', 'P@ssw0rd');
            expect($scope.validPassConf).toBe(true);
        })

        it('sets validPassConf to false if passwords do not match', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validatePassConf('P@ssw0rd', 'p@ssw0rd');
            expect($scope.validPassConf).toBe(false);
        })
    })

    describe('validatePhone', function () {
        it('sets validPhone to true if phone passes regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validatePhone('1234567');
            expect($scope.validPhone).toBe(false);
            $scope.validatePhone('123-4567');
            expect($scope.validPhone).toBe(false);
            $scope.validatePhone('555-I23-4567');
            expect($scope.validPhone).toBe(false);

            $scope.validatePhone('555-123-4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('555.123.4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('(555) 123 4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('(555)123-4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('(555) 123-4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('[555]1234567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('5551234567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('1-555-123-4567');
            expect($scope.validPhone).toBe(true);
            $scope.validatePhone('+1(555)123-4567');
            expect($scope.validPhone).toBe(true);
        })
    })

    describe('validateState', function () {
        it('sets validState to true if state is two letters', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateState('MD');
            expect($scope.validState).toBe(true);
            $scope.validateState('M3');
            expect($scope.validState).toBe(false);
        })
    })

    describe('validateStreet', function () {
        it('sets validStreet to true if street matches regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateStreet('101A 9th Street, Apt B');
            expect($scope.validStreet).toBe(true);
            $scope.validateStreet('101 9th Street, Apt 3C');
            expect($scope.validStreet).toBe(true);
            $scope.validateStreet('2612 Avenue D');
            expect($scope.validStreet).toBe(true);
            $scope.validateStreet('456 Broadway');
            expect($scope.validStreet).toBe(true);
            $scope.validateStreet('4 Main Avenue');
            expect($scope.validStreet).toBe(true);
        })

        it('sets validStreet to false if street does not match regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateStreet('9th Street, Apt B');
            expect($scope.validStreet).toBe(false);
            $scope.validateStreet('D Block');
            expect($scope.validStreet).toBe(false);
            $scope.validateStreet('Earth');
            expect($scope.validStreet).toBe(false);
            $scope.validateStreet('123First St');
            expect($scope.validStreet).toBe(false);
            $scope.validateStreet('123FirstSt');
            expect($scope.validStreet).toBe(false);

        })
    })

    describe('validateZip', function () {
        it('sets validZip to true if zip matches regex', function () {
            var $scope = {};
            var controller = $controller('registerCtrl', { $scope: $scope });

            $scope.validateZip('21061');
            expect($scope.validZip).toBe(true);
            $scope.validateZip('21o54');
            expect($scope.validZip).toBe(false);
        })
    })

})