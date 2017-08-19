angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'features/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'features/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })


  // Additional Pages
  .state('appSimple.login', {
    url: '/simplogin',
    templateUrl: 'views/pages/login.html'
  })
  .state('appSimple.register', {
    url: '/simpregister',
    templateUrl: 'views/pages/register.html',
    controller: 'registerCtrl'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })


  // ***** CUSTOM STATES *****


  // Account Management
  .state('app.login', {
    url: '/login',
    templateUrl: 'features/accounts/login.html',
    controller: 'loginCtrl',
    ncyBreadcrumb: {
      label: 'Login'
    }
  })
  .state('app.register', {
    url: '/register',
    templateUrl: 'features/accounts/register.html',
    controller: 'registerCtrl',
    ncyBreadcrumb: {
      label: 'Register'
    }
  })

  .state('app.reports', {
    url: '/reports',
    templateUrl: 'features/reports/reports.html',
    ncyBreadcrumb: {
      label: 'Reports'
    }
  })
  .state('app.reports.roster', {
    url: '/roster',
    templateUrl: 'features/roster/roster.html',
    controller: 'rosterCtrl',
    ncyBreadcrumb: {
      label: 'Alpha Roster'
    }
  })
  .state('app.reports.roster.sailorDetails', {
    url: '/details/:id',
    templateUrl: 'features/roster/sailorDetails.html',
    controller: 'sailorDetsCtrl',
    ncyBreadcrumb: {
      label: 'Sailor Details'
    }
  })

  .state('app.profile', {
    url: '/profile',
    templateUrl: 'features/accounts/profile.html',
    controller: 'profileCtrl',
    ncyBreadcrumb: {
      label: 'Your Profile'
    }
  })
}]);
