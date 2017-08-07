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

var serviceBase = 'http://localhost:5000'; 

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngResource',
  'devApi',
  'roster',
  'accounts',
  'LocalStorageModule'
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
// .config(['$httpProvider', function ($httpProvider) {
//   $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {

//     return {
//       request: function (config) {
//         return config;
//       },
//       requestError: function (rejection) {
//         return $q.reject(rejection);
//       },
//       response: function (response) {
//         if (response.status == "401") {
//           $location.path('/login')
//         }
//         return $q.reject(rejection);
//       }
//     };
//   });
// }])
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);
