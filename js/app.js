'use strict';

// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';


angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngResource',
  'LocalStorageModule',
  'ngAnimate',
  'ui.bootstrap'
])

// .constant('aspApiUrl', 'http://localhost:5000')

// Implements JWT interceptor
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
})

// Stock demo loading bar
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])

.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}])

// Load existing JWT on app start
.run(['authService', function (authService) {
  authService.fillAuthData();
}])


// Removes modal background after ng-click event
.directive('removeModal', ['$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                $document[0].body.classList.remove('modal-open');
                    angular.element($document[0].getElementsByClassName('modal-backdrop')).remove();
                    angular.element($document[0].getElementsByClassName('modal')).remove();
                });
            }
        };
    }])


// Present dates in military format
.filter('milDate', function ($filter, $log) {
        var angularDateFilter = $filter('date');
        return function (theDate) {
            return angularDateFilter(new Date(theDate), 'dd MMM yyyy');
        };
    })
.filter('split', function () {
    return function(input) {
        return input.split(',');
    };
})
.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});