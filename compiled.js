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
.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}])

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
.filter('milDate', ["$filter", "$log", function ($filter, $log) {
        var angularDateFilter = $filter('date');
        return function (theDate) {
            return angularDateFilter(new Date(theDate), 'dd MMM yyyy');
        };
    }])
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
angular
.module('app')
.directive('a', preventClickDirective)
.directive('a', bootstrapCollapseDirective)
.directive('a', navigationDirective)
.directive('button', layoutToggleDirective)
.directive('a', layoutToggleDirective)
.directive('button', collapseMenuTogglerDirective)
.directive('div', bootstrapCarouselDirective)
.directive('toggle', bootstrapTooltipsPopoversDirective)
.directive('tab', bootstrapTabsDirective)
.directive('button', cardCollapseDirective);

//Prevent click if href="#"
function preventClickDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (attrs.href === '#'){
      element.on('click', function(event){
        event.preventDefault();
      });
    }
  }
}

//Bootstrap Collapse
function bootstrapCollapseDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='collapse'){
      element.attr('href','javascript;;').attr('data-target',attrs.href.replace('index.html',''));
    }
  }
}

/**
* @desc Genesis main navigation - Siedebar menu
* @example <li class="nav-item nav-dropdown"></li>
*/
function navigationDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if(element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
      element.on('click', function(){
        if(!angular.element('body').hasClass('compact-nav')) {
          element.parent().toggleClass('open').find('.open').removeClass('open');
        }
      });
    } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
      element.on('click', function(){
        element.parent().toggleClass('open').find('.open').removeClass('open');
      });
    }
  }
}

//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];
function sidebarNavDynamicResizeDirective($window, $timeout) {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {

    if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
      var bodyHeight = angular.element(window).height();
      scope.$watch(function(){
        var headerHeight = angular.element('header').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight);
        } else {
          element.css('height', bodyHeight - headerHeight);
        }
      });

      angular.element($window).bind('resize', function(){
        var bodyHeight = angular.element(window).height();
        var headerHeight = angular.element('header').outerHeight();
        var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
        var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
        } else {
          element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
        }
      });
    }
  }
}

//LayoutToggle
layoutToggleDirective.$inject = ['$interval'];
function layoutToggleDirective($interval) {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    element.on('click', function(){

      if (element.hasClass('sidebar-toggler')) {
        angular.element('body').toggleClass('sidebar-hidden');
      }

      if (element.hasClass('aside-menu-toggler')) {
        angular.element('body').toggleClass('aside-menu-hidden');
      }
    });
  }
}

//Collapse menu toggler
function collapseMenuTogglerDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    element.on('click', function(){
      if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
        angular.element('body').toggleClass('sidebar-mobile-show');
      }
    });
  }
}

//Bootstrap Carousel
function bootstrapCarouselDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (attrs.ride=='carousel'){
      element.find('a').each(function(){
        $(this).attr('data-target',$(this).attr('href').replace('index.html','')).attr('href','javascript;;');
      });
    }
  }
}

//Bootstrap Tooltips & Popovers
function bootstrapTooltipsPopoversDirective() {
  var directive = {
    restrict: 'A',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='tooltip'){
      angular.element(element).tooltip();
    }
    if (attrs.toggle=='popover'){
      angular.element(element).popover();
    }
  }
}

//Bootstrap Tabs
function bootstrapTabsDirective() {
  var directive = {
    restrict: 'A',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    element.click(function(e) {
      e.preventDefault();
      angular.element(element).tab('show');
    });
  }
}

//Card Collapse
function cardCollapseDirective() {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='collapse' && element.parent().hasClass('card-actions')){

      if (element.parent().parent().parent().find('.card-block').hasClass('in')) {
        element.find('i').addClass('r180');
      }

      var id = 'collapse-' + Math.floor((Math.random() * 1000000000) + 1);
      element.attr('data-target','#'+id);
      element.parent().parent().parent().find('.card-block').attr('id',id);

      element.on('click', function(){
        element.find('i').toggleClass('r180');
      });
    }
  }
}

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


  // **** PROJECTS ****
  .state('app.projects', {
    url: '/projects',
    templateUrl: 'features/projects/projects.html',
    controller: 'projectListCtrl',
    controllerAs: 'projects',
    ncyBreadcrumb: {
      label: 'Projects'
    }
  })
  .state('app.projects.new', {
    url: '/newproject',
    templateUrl: 'features/projects/newproject.html',
    controller: 'newProjectCtrl',
    controllerAs: 'project',
    ncyBreadcrumb: {
      label: 'New Project'
    }
  })
  .state('app.projects.details', {
    url: '/details/:id',
    templateUrl: 'features/projects/projectDetails.html',
    controller: 'projectDetsCtrl',
    ncyBreadcrumb: {
      label: 'Details'
    }
  })

  // **** QUIZ ****
  .state('app.quiz', {
    url: '/quiz',
    templateUrl: 'features/quiz/quizGen.html',
    controller: 'quizGenCtrl',
    controllerAs: 'vm',
    ncyBreadcrumb: {
      label: 'Quiz Generator'
    }
  })
  .state('app.quiz.create', {
    url: '/create',
    templateUrl: 'features/quiz/quizCreate.html',
    controller: 'quizCreateCtrl',
    controllerAs: 'vm',
    ncyBreadcrumb: {
      label: 'Create Quiz'
    }
  })
  .state('app.quiz.yourQuiz', {
    url: '/yourquiz',
    templateUrl: 'features/quiz/yourQuiz.html',
    // controller: 'quizCreateCtrl',
    // controllerAs: 'vm',
    ncyBreadcrumb: {
      label: 'Your Quiz'
    }
  })
  .state('app.quiz.edit', {
    url: '/edit/:topicId',
    templateUrl: 'features/quiz/quizCreate.html',
    controller: 'quizCreateCtrl',
    controllerAs: 'vm',
    ncyBreadcrumb: {
      label: 'Edit Quiz'
    }
  });
}]);

//chart.js
angular
.module('app')
.controller('LineCtrl', LineCtrl)
.controller('BarCtrl', BarCtrl)
.controller('DoughnutCtrl', DoughnutCtrl)
.controller('RadarCtrl', RadarCtrl)
.controller('PieCtrl', PieCtrl)
.controller('PolarAreaCtrl', PolarAreaCtrl);

LineCtrl.$inject = ['$scope'];
function LineCtrl($scope) {
  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
}

BarCtrl.$inject = ['$scope'];
function BarCtrl($scope) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
}

DoughnutCtrl.$inject = ['$scope'];
function DoughnutCtrl($scope) {
  $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  $scope.data = [300, 500, 100];
}

RadarCtrl.$inject = ['$scope'];
function RadarCtrl($scope) {
  $scope.labels =['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  $scope.data = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
}

PieCtrl.$inject = ['$scope'];
function PieCtrl($scope) {
  $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  $scope.data = [300, 500, 100];
}

PolarAreaCtrl.$inject = ['$scope'];
function PolarAreaCtrl($scope) {
  $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Tele Sales', 'Corporate Sales'];
  $scope.data = [300, 500, 100, 40, 120];
}

//main.js
angular
  .module('app')
  .controller('trafficDemoCtrl', trafficDemoCtrl)
  .controller('socialBoxCtrl', socialBoxCtrl)
  .controller('sparklineChartCtrl', sparklineChartCtrl)
  .controller('barChartCtrl', barChartCtrl)
  .controller('horizontalBarsCtrl', horizontalBarsCtrl)
  .controller('horizontalBarsType2Ctrl', horizontalBarsType2Ctrl)
  .controller('usersTableCtrl', usersTableCtrl);


trafficDemoCtrl.$inject = ['$scope'];
function trafficDemoCtrl($scope) {

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var elements = 27;
  var data1 = [];
  var data2 = [];
  var data3 = [];

  for (var i = 0; i <= elements; i++) {
    data1.push(random(50, 200));
    data2.push(random(80, 100));
    data3.push(65);
  }

  $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.series = ['Current', 'Previous', 'BEP'];
  $scope.data = [data1, data2, data3];
  $scope.colors = [{
    backgroundColor: convertHex(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: '#fff'

  }, {
    backgroundColor: 'transparent',
    borderColor: brandSuccess,
    pointHoverBackgroundColor: '#fff'
  }, {
    backgroundColor: 'transparent',
    borderColor: brandDanger,
    pointHoverBackgroundColor: '#fff',
    borderWidth: 1,
    borderDash: [8, 5]
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  };
}

dateRangeCtrl.$inject = ['$scope'];
function dateRangeCtrl($scope) {
  $scope.date = {
    startDate: moment().subtract(5, 'days'),
    endDate: moment()
  };
  $scope.opts = {
    drops: 'down',
    opens: 'left',
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 days': [moment().subtract(7, 'days'), moment()],
      'Last 30 days': [moment().subtract(30, 'days'), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')]
    }
  };

  //Watch for date changes
  $scope.$watch('date', function (newDate) {
    //console.log('New date set: ', newDate);
  }, false);

  function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
  }
}

socialBoxCtrl.$inject = ['$scope'];
function socialBoxCtrl($scope) {

  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  $scope.data1 = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.data2 = [
    [1, 13, 9, 17, 34, 41, 38]
  ];
  $scope.data3 = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }
}

sparklineChartCtrl.$inject = ['$scope'];
function sparklineChartCtrl($scope) {
  $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.data1 = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.data2 = [
    [1, 13, 9, 17, 34, 41, 38]
  ];
  $scope.data3 = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.default = [{
    backgroundColor: 'transparent',
    borderColor: '#d1d4d7',
  }];
  $scope.primary = [{
    backgroundColor: 'transparent',
    borderColor: brandPrimary,
  }];
  $scope.info = [{
    backgroundColor: 'transparent',
    borderColor: brandInfo,
  }];
  $scope.danger = [{
    backgroundColor: 'transparent',
    borderColor: brandDanger,
  }];
  $scope.warning = [{
    backgroundColor: 'transparent',
    borderColor: brandWarning,
  }];
  $scope.success = [{
    backgroundColor: 'transparent',
    borderColor: brandSuccess,
  }];
  $scope.options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  };
}

horizontalBarsCtrl.$inject = ['$scope'];
function horizontalBarsCtrl($scope) {

  $scope.data = [
    {
      day: 'Monday', new: 34, recurring: 78
    },
    {
      day: 'Tuesday', new: 56, recurring: 94
    },
    {
      day: 'Wednesday', new: 12, recurring: 67
    },
    {
      day: 'Thursday', new: 43, recurring: 91
    },
    {
      day: 'Friday', new: 22, recurring: 73
    },
    {
      day: 'Saturday', new: 53, recurring: 82
    },
    {
      day: 'Sunday', new: 9, recurring: 69
    }
  ];
}

horizontalBarsType2Ctrl.$inject = ['$scope'];
function horizontalBarsType2Ctrl($scope) {

  $scope.gender = [
    {
      title: 'Male',
      icon: 'icon-user',
      value: 43
    },
    {
      title: 'Female',
      icon: 'icon-user-female',
      value: 37
    },
  ];

  $scope.source = [
    {
      title: 'Organic Search',
      icon: 'icon-globe',
      value: 191235,
      percent: 56
    },
    {
      title: 'Facebook',
      icon: 'icon-social-facebook',
      value: 51223,
      percent: 15
    },
    {
      title: 'Twitter',
      icon: 'icon-social-twitter',
      value: 37564,
      percent: 11
    },
    {
      title: 'LinkedIn',
      icon: 'icon-social-linkedin',
      value: 27319,
      percent: 8
    }
  ];
}

usersTableCtrl.$inject = ['$scope', '$timeout'];
function usersTableCtrl($scope, $timeout) {

  $scope.users = [
    {
      avatar: '1.jpg',
      status: 'active',
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'USA',
      flag: 'USA.png',
      usage: '50',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'mastercard',
      activity: '10 sec ago',
      satisfaction: '48'
    },
    {
      avatar: '2.jpg',
      status: 'busy',
      name: 'Avram Tarasios',
      new: false,
      registered: 'Jan 1, 2015',
      country: 'Brazil',
      flag: 'Brazil.png',
      usage: '10',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'visa',
      activity: '5 minutes ago',
      satisfaction: '61'
    },
    {
      avatar: '3.jpg',
      status: 'away',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'India',
      flag: 'India.png',
      usage: '74',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'stripe',
      activity: '1 hour ago',
      satisfaction: '33'
    },
    {
      avatar: '4.jpg',
      status: 'offline',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'France',
      flag: 'France.png',
      usage: '98',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'paypal',
      activity: 'Last month',
      satisfaction: '23'
    },
    {
      avatar: '5.jpg',
      status: 'active',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Spain',
      flag: 'Spain.png',
      usage: '22',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'google',
      activity: 'Last week',
      satisfaction: '78'
    },
    {
      avatar: '6.jpg',
      status: 'busy',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Poland',
      flag: 'Poland.png',
      usage: '43',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'amex',
      activity: 'Yesterday',
      satisfaction: '11'
    }
  ];
}

clientsTableCtrl.$inject = ['$scope', '$timeout'];
function clientsTableCtrl($scope, $timeout) {

  $scope.users = [
    {
      avatar: '1.jpg',
      status: 'active',
      name: 'Yiorgos Avraamu',
      registered: 'Jan 1, 2015',
      activity: '10 sec ago',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '2.jpg',
      status: 'busy',
      name: 'Avram Tarasios',
      registered: 'Jan 1, 2015',
      activity: '5 minutes ago',
      transactions: 156,
      comments: 76
    },
    {
      avatar: '3.jpg',
      status: 'away',
      name: 'Quintin Ed',
      registered: 'Jan 1, 2015',
      activity: '1 hour ago',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '4.jpg',
      status: 'offline',
      name: 'Enéas Kwadwo',
      registered: 'Jan 1, 2015',
      activity: 'Last month',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '5.jpg',
      status: 'active',
      name: 'Agapetus Tadeáš',
      registered: 'Jan 1, 2015',
      activity: 'Last week',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '6.jpg',
      status: 'busy',
      name: 'Friderik Dávid',
      registered: 'Jan 1, 2015',
      activity: 'Yesterday',
      transactions: 189,
      comments: 72
    }
  ];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

barChartCtrl.$inject = ['$scope'];
function barChartCtrl($scope) {

  var elements = 16;
  var labels = [];
  var data = [];
  var data1 = [];
  var data2 = [];

  for (var i = 0; i <= elements; i++) {
    labels.push('1');
    data.push(random(40, 100));
    data1.push(random(20, 100));
    data2.push(random(60, 100));
  }

  $scope.labels = labels;

  $scope.data = [data];
  $scope.data1 = [data1];
  $scope.data2 = [data2];

  $scope.options = {
    showScale: false,
    scaleFontSize: 0,
    scaleShowGridLines: false,
    barStrokeWidth: 0,
    barBackground: 'rgba(221, 224, 229, 1)',

    // pointDot :false,
    // scaleLineColor: 'transparent',
  };

  $scope.colors = [{
    backgroundColor: brandInfo,
    borderColor: 'rgba(0,0,0,1)',
    highlightFill: '#818a91',
    pointborderColor: '#000'
  }];
}

//widgets.js
angular
.module('app')
.controller('cardChartCtrl1', cardChartCtrl1)
.controller('cardChartCtrl2', cardChartCtrl2)
.controller('cardChartCtrl3', cardChartCtrl3)
.controller('cardChartCtrl4', cardChartCtrl4)
.controller('cardChartCtrl5', cardChartCtrl5)
.controller('cardChartCtrl6', cardChartCtrl6)
.controller('cardChartCtrl7', cardChartCtrl7)
.controller('cardChartCtrl8', cardChartCtrl8)
.controller('cardChartCtrl9', cardChartCtrl9)
.controller('cardChartCtrl10', cardChartCtrl10)
.controller('cardChartCtrl11', cardChartCtrl11)
.controller('cardChartCtrl12', cardChartCtrl12)
.controller('cardChartCtrl13', cardChartCtrl13)

//convert Hex to RGBA
function convertHex(hex,opacity){
  hex = hex.replace('#','');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}

cardChartCtrl1.$inject = ['$scope'];
function cardChartCtrl1($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.colors = [{
    backgroundColor: brandPrimary,
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, $scope.data[0]) - 5,
          max: Math.max.apply(Math, $scope.data[0]) + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }
}

cardChartCtrl2.$inject = ['$scope'];
function cardChartCtrl2($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [1, 18, 9, 17, 34, 22, 11]
  ];
  $scope.colors = [{
    backgroundColor: brandInfo,
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, $scope.data[0]) - 5,
          max: Math.max.apply(Math, $scope.data[0]) + 5
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },

    },
  }
}

cardChartCtrl3.$inject = ['$scope'];
function cardChartCtrl3($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.2)',
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

cardChartCtrl4.$inject = ['$scope'];
function cardChartCtrl4($scope) {

  var elements = 16;
  var labels = [];
  var data = [];
  //
  for (var i = 2000; i <= 2000 + elements; i++) {
    labels.push(i);
    data.push(random(40,100));
  }

  $scope.labels = labels;

  $scope.data = [data];

  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.3)',
    borderWidth: 0
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
  }
}

cardChartCtrl5.$inject = ['$scope'];
function cardChartCtrl5($scope) {

  var elements = 15;
  var labels = [];
  var data = [];

  for (var i = 0; i <= elements; i++) {
    labels.push(i);
    data.push(random(40,100));
  }

  $scope.labels = labels;

  $scope.data = [data];

  $scope.colors = [{
    backgroundColor: brandPrimary,
    borderColor: 'transparent',
    borderWidth: 1
  }];

  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
  }
}

cardChartCtrl6.$inject = ['$scope'];
function cardChartCtrl6($scope) {

  var elements = 15;
  var labels = [];
  var data = [];

  for (var i = 0; i <= elements; i++) {
    labels.push(i);
    data.push(random(40,100));
  }

  $scope.labels = labels;

  $scope.data = [data];

  $scope.colors = [{
    backgroundColor: brandDanger,
    borderColor: 'transparent',
    borderWidth: 1
  }];

  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
  }
}

cardChartCtrl7.$inject = ['$scope'];
function cardChartCtrl7($scope) {

  var elements = 15;
  var labels = [];
  var data = [];

  for (var i = 0; i <= elements; i++) {
    labels.push(i);
    data.push(random(40,100));
  }

  $scope.labels = labels;

  $scope.data = [data];

  $scope.colors = [{
    backgroundColor: brandSuccess,
    borderColor: 'transparent',
    borderWidth: 1
  }];

  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
  }
}

cardChartCtrl8.$inject = ['$scope'];
function cardChartCtrl8($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: brandInfo,
  }];
  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
        points:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: { point: { radius: 0 } }
  };
}

cardChartCtrl9.$inject = ['$scope'];
function cardChartCtrl9($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: brandSuccess,
  }];
  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
        points:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: { point: { radius: 0 } }
  };
}

cardChartCtrl10.$inject = ['$scope'];
function cardChartCtrl10($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: brandWarning,
  }];
  $scope.options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
        points:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: { point: { radius: 0 } }
  };
}

cardChartCtrl11.$inject = ['$scope'];
function cardChartCtrl11($scope) {

  $scope.labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  $scope.data = [
    [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9]
  ];

  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
        points:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: { point: { radius: 0 } }
  };

  $scope.colors2 = [{
    backgroundColor: 'rgba(0,0,0,.2)',
    borderWidth: 0
  }];

  $scope.options2 = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display:false,
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  };
}

cardChartCtrl12.$inject = ['$scope'];
function cardChartCtrl12($scope) {

  $scope.labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  $scope.data = [
    [75, 59, 94, 104, 151, 155, 240]
  ];
  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: grayLighter,
    pointBackgroundColor: '#fff',
    borderWidth: 3,
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  };
}

cardChartCtrl13.$inject = ['$scope'];
function cardChartCtrl13($scope) {

  $scope.labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  $scope.data = [
    [31000, 34000, 27000, 24000, 28000, 42500, 42000, 30000, 35500, 35500, 41500, 41600]
  ];
  $scope.colors = [{
    backgroundColor: 'transparent',
    borderColor: '#fff',
    pointBackgroundColor: brandPrimary,
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontColor: '#fff',
          maxTicksLimit: 3,
          maxRotation: 0,
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255,255,255,.2)',
          zeroLineColor: 'rgba(255,255,255,.2)'
        },
        ticks: {
          maxTicksLimit: 10,
          stepSize: Math.ceil(45000 / 10),
          max: 45000,
          fontColor: '#fff',
          callback: function(value) {
            return '$' + value;
          }
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 2,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  };

  $scope.labels2 = ['US','PL','GB','DE','NL','CA','FI', 'RU', 'AU', 'N/A'];
  $scope.data2 = [
    [35, 14, 10, 8, 6, 6, 5, 4, 3, 9]
  ];

  $scope.colors2 = [{
    backgroundColor: brandSuccess,
    borderWidth: 0,
  }];
  $scope.options2 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          maxRotation: 0,
        },
        barPercentage: 0.6,
      }],
      yAxes: [{
        display:false,
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  }
}

angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.icons.fontawesome', {
    url: '/font-awesome',
    templateUrl: 'views/icons/font-awesome.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    }
  })
  .state('app.icons.simplelineicons', {
    url: '/simple-line-icons',
    templateUrl: 'views/icons/simple-line-icons.html',
    ncyBreadcrumb: {
      label: 'Simple Line Icons'
    }
  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Components'
    }
  })
  .state('app.components.buttons', {
    url: '/buttons',
    templateUrl: 'views/components/buttons.html',
    ncyBreadcrumb: {
      label: 'Buttons'
    }
  })
  .state('app.components.social-buttons', {
    url: '/social-buttons',
    templateUrl: 'views/components/social-buttons.html',
    ncyBreadcrumb: {
      label: 'Social Buttons'
    }
  })
  .state('app.components.cards', {
    url: '/cards',
    templateUrl: 'views/components/cards.html',
    ncyBreadcrumb: {
      label: 'Cards'
    }
  })
  .state('app.components.forms', {
    url: '/forms',
    templateUrl: 'views/components/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    }
  })
  .state('app.components.switches', {
    url: '/switches',
    templateUrl: 'views/components/switches.html',
    ncyBreadcrumb: {
      label: 'Switches'
    }
  })
  .state('app.components.tables', {
    url: '/tables',
    templateUrl: 'views/components/tables.html',
    ncyBreadcrumb: {
      label: 'Tables'
    }
  })
  .state('app.forms', {
    url: '/forms',
    templateUrl: 'views/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          {
            serie: true,
            files: ['js/libs/moment.min.js']
          },
          {
            serie: true,
            files: ['js/libs/daterangepicker.min.js', 'js/libs/angular-daterangepicker.min.js']
          },
          {
            files: ['js/libs/mask.min.js']
          },
          {
            files: ['js/libs/select.min.js']
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/forms.js']
        });
      }]
    }
  })
  .state('app.widgets', {
    url: '/widgets',
    templateUrl: 'views/widgets.html',
    ncyBreadcrumb: {
      label: 'Widgets'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/widgets.js']
        });
      }]
    }
  })
  .state('app.charts', {
    url: '/charts',
    templateUrl: 'views/charts.html',
    ncyBreadcrumb: {
      label: 'Charts'
    },
    resolve: {
      // Plugins loaded before
      // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
      //     return $ocLazyLoad.load([
      //         {
      //             serial: true,
      //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
      //         }
      //     ]);
      // }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/charts.js']
        });
      }]
    }
  })
}]);

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

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

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

angular.module('app')
    .factory('authInterceptorService', authInterceptorService);

authInterceptorService.$inject = ['$q', '$location', 'localStorageService', '$window', '$state'];
function authInterceptorService($q, $location, localStorageService, $window, $state) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;

        }

        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $window.alert('You are not authorized to view this page.  Please log in with sufficient credentials.');
            $state.transitionTo('app.main', {}, { reload: true });
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;

} 
angular.module('app')
    .factory('dataSvc', dataSvc);

dataSvc.$inject = ['$resource', 'authService'];
function dataSvc($resource, authService) {

    var aspApiUrl = 'http://localhost:5000';
    // var aspApiUrl = 'portal';
    var authentication = authService.authentication;

    return {
        // USERS
        getUsers: getUsers,
        getCurUser: getCurUser,
        manageUser: manageUser,
        getTeamMembers: getTeamMembers,
        teams: ['Virtualization', 'Infrastructure', 'IT Support', 'Training'],
        // ROLES
        addRole: addRole,
        getRoles: getRoles,
        // TODOS
        getToDos: getToDos,
        manageToDos: manageToDos,
        // POCS
        managePocs: managePocs,
        // PROJECTS
        manageAttachments: manageAttachments,
        manageComments: manageComments,
        manageLinks: manageLinks,
        manageProjs: manageProjs,
        manageTasks: manageTasks,
        manageTeam: manageTeam,
        // QUIZ
        manageBulkAdd: manageBulkAdd,
        manageQuestions: manageQuestions,
        manageReferences: manageReferences,
        manageSections: manageSections,
        manageTopics: manageTopics,
        quizGen: quizGen,
        checkQuiz: checkQuiz
    };




    // **** USER MANAGEMENT ****

    function getUsers() {
        // Get all user data
        return $resource(aspApiUrl + '/api/account/users').query();
    };

    function getTeamMembers(team) {
        // Get all members of a team
        return $resource(aspApiUrl + '/api/account/team?team=:team').query({ team: team });
    }

    function getCurUser() {
        if (authentication.isAuth) {
            var curUser = $resource(aspApiUrl + '/api/account?username=' + authService.authentication.userName).get();
        };
        return curUser
    }

    function manageUser() {
        // GET: single user data by Id,
        // DELETE: delete user
        // PUT: update user
        return $resource(aspApiUrl + '/api/account/user/:id', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** ACCOUNT MANAGEMENT ****

    function addRole() {
        // Add a user to a role
        return $resource(aspApiUrl + '/api/roles/ManageUsersInRole');
    };

    function getRoles() {
        // List of available roles
        return $resource(aspApiUrl + '/api/roles').query();
    };


    // **** TODO ****

    function getToDos(id) {
        // List a user's todos
        return $resource(aspApiUrl + '/api/todos?SailorId=:sailorId').query({ sailorId: id });
    };

    function manageToDos() {
        // DELETE: remove todo
        // QUERY: get a user's toDos
        // UPDATE: update todo
        // SAVE: new todo
        return $resource(aspApiUrl + '/api/todos/:todoId', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** POCs ****

    function managePocs() {
        // GET all pocs
        // SAVE new poc
        // DELETE remove poc
        // UPDATE edit poc
        return $resource(aspApiUrl + '/api/Pocs/:id', null, {
            'update': { method: 'PUT' }
        });
    };


    // **** PROJECTS ****

    function manageAttachments() {
        return $resource(aspApiUrl + '/api/Comments/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageComments() {
        return $resource(aspApiUrl + '/api/Comments/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageLinks() {
        return $resource(aspApiUrl + '/api/Links/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageProjs() {
        // QUERY all projects
        // SAVE new project
        // DELETE remove project
        // GET single project with details
        // PUT update basic project info
        return $resource(aspApiUrl + '/api/Projects/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageTasks() {
        return $resource(aspApiUrl + '/api/WorkItems/:id', null, {
            'update': { method: 'PUT' }
        });
    };

    function manageTeam() {
        // SAVE new team member
        // DELETE team member
        // PUT update team member (add team lead)
        return $resource(aspApiUrl + '/api/TeamMembers/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    // **** QUIZ ****
    function manageBulkAdd() {
        return $resource(aspApiUrl + '/api/Questions/bulkAdd', null, {
            'send': { method: 'POST', isArray: true }
        });
    }

    function manageTopics() {
        return $resource(aspApiUrl + '/api/Topics/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageReferences() {
        return $resource(aspApiUrl + '/api/References/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageSections() {
        return $resource(aspApiUrl + '/api/Sections/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function manageQuestions() {
        return $resource(aspApiUrl + '/api/Questions/:id', null, {
            'update': { method: 'PUT' }
        });
    }

    function quizGen() {
        return $resource(aspApiUrl + '/api/Quiz');
    }

    function checkQuiz() {
        return $resource(aspApiUrl + '/api/Quiz/CheckAnswers', null, {
            'send': { method: 'POST', isArray: true }
        });
    }
};
angular
.module('app')
.controller('navbarCtrl', navbarCtrl);

navbarCtrl.$inject = ['$location', 'dataSvc', 'authService', '$scope'];
function navbarCtrl ($location, dataSvc, authService, $scope) {

  var vm = this;
  
  vm.authentication = authService.authentication;
  vm.logOut = logOut;
  vm.userData = {};

  // $scope.$on('authUpdate', function (event, data) {
  //   vm.authentication = data;
  //   console.log('Received broadcast');
  //   console.log(vm.authentication);
  //   init();
  // })

  init();

  function init () {
    if (vm.authentication.isAuth) {
      vm.userData = dataSvc.getCurUser();
      console.log("navbar ctrl found authdata");
    };
  };
  
  function logOut () {
    authService.logOut();
    $location.path('/dashboard');
  };
};

angular.module('app')
    .controller('pocsCtrl', pocsCtrl);

pocsCtrl.$inject = ['$scope', 'dataSvc', '$window', '$resource', '$location', '$anchorScroll'];
function pocsCtrl($scope, dataSvc, $window, $location, $resource, $anchorScroll) {

    var Pocs = dataSvc.managePocs();

    $scope.addPoc = addPoc;
    $scope.deletePoc = deletePoc;
    $scope.pocs = {};
    $scope.saveUpdate = saveUpdate;
    $scope.toggleEdit = toggleEdit;

    init();

    function init() {
        $scope.pocs = Pocs.query();
        $scope.showAdd = false;
        $scope.showEdit = false;
        $scope.update = {};
        $scope.newPoc = {};
    };

    function addPoc(newPoc) {
        Pocs.save(newPoc).$promise.then(function () {
            init();
        });
    };

    function deletePoc(pocId) {
        Pocs.delete({ id: pocId }).$promise.then(function () {
            init();
        });
    };

    function saveUpdate(updatedPoc) {
        Pocs.update({ id: updatedPoc.id }, updatedPoc);
            init();
    };

    function toggleEdit(contact) {
        $scope.showEdit = true;
        $scope.update = contact;
        $location.hash('pocs');
        $anchorScroll();
    };
};

angular
    .module('app')
    .controller('toDoCtrl', toDoCtrl);

toDoCtrl.$inject = ['authService', 'dataSvc', '$window'];
function toDoCtrl(authService, dataSvc, $window) {

    var auth = authService.authentication;
    var toDoMgr = dataSvc.manageToDos();
    var vm = this;

    vm.authed = false;
    vm.newToDo = {};
    vm.toDos = [];
    vm.userData = {};
    vm.showAdd = false;

    vm.addToDo = addToDo;
    vm.delToDo = delToDo;
    vm.toggleAdd = toggleAdd;

    init();

    function init() {
        if (auth.isAuth) {
            vm.authed = true;
            vm.userData = dataSvc.getCurUser().$promise.then( function (data) {
                vm.toDos = data.toDos;
            });
        };
    };

    function addToDo() {
        vm.newToDo.sailorId = vm.userData.id;
        toDoMgr.save(vm.newToDo, function (data) {
            vm.toDos.push(data);
            vm.newToDo = {};
            vm.newToDo.priority = "low";
            $window.document.getElementById('toDoItem').focus();
        });
    };

    function delToDo(toDoId) {
        toDoMgr.delete({ id: toDoId }, function (data) {
            vm.toDos = dataSvc.getToDos(vm.userData.id);
        });
    };

    function toggleAdd() {
        vm.showAdd = !vm.showAdd;
    };
};

angular.module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$location', 'authService', '$state', '$rootScope'];
function loginCtrl($scope, $location, authService, $state, $rootScope) {

    $scope.login = login;
    $scope.loginData = {};
    // $rootScope.message = "";

    $scope.$on('messageUpdate',function (event, data) {
        $rootScope.message = data;
    });

    function login() {
        authService.login($scope.loginData)
            .then(function (response) {
                $state.transitionTo('app.main', {}, { reload: true });
            },
            function (error_description) {
                // $scope.message = error_description.data.error_description; // Fix this
                console.log(error_description.data.error_description);
                $rootScope.$broadcast('messageUpdate',error_description.data.error_description);
            });
    };

};

angular
    .module('app')
    .controller('profileCtrl', profileCtrl);


profileCtrl.$inject = ['$scope', 'dataSvc', 'authService', '$state'];
function profileCtrl($scope, dataSvc, authService, $state) {

    var authentication = authService.authentication;
    var userMgr = dataSvc.manageUser();

    $scope.enableEdit = false;
    $scope.updateProfile = updateProfile;
    $scope.userData = {};

    init();

    function init() {
        if (authentication.isAuth) {
            $scope.userData = dataSvc.getCurUser();
            $scope.newData = $scope.userData;
        }
        else {
            $state.transitionTo('app.main');
        }
    };

    function updateProfile() {
        userMgr.update({ id: $scope.userData.id }, $scope.newData, function (data) {
            $scope.userData = data;
        });
        $scope.enableEdit = false;
    };
};
angular.module('app')
    .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$scope', '$location', '$timeout', 'authService', '$state', '$rootScope'];
function registerCtrl($scope, $location, $timeout, authService, $state, $rootScope) {

    $scope.getRank = getRank;
    // $scope.message = "";
    $scope.passwordStrength = passwordStrength;
    $scope.registration = {};
    $scope.registration.blueBadge = false; // Just default this to false on backend
    // $scope.savedSuccessfully = false;
    $scope.signUp = signUp;
    $scope.startTimer = startTimer;
    $scope.validatePassword = validatePassword;

    $scope.$on('registerFeedback', function (event, data) {
        $rootScope.registerMessage = data.feedback;
        $rootScope.savedSuccessfully = data.savedSuccessfully;
    })


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
        $scope.registration.phoneNumber = $scope.registration.phoneNumber.replace(/[^0-9]+/g, '');
        authService.saveRegistration($scope.registration)
            .then(function (response) {
                $rootScope.$broadcast('registerFeedback',{feedback: "Registration succssful!  Logging you in...", savedSuccessfully: true});
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
                $rootScope.$broadcast('registerFeedback',{feedback: message, savedSuccessfully: false});
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
        }, 1000);
    };
};

(function () {
    'use strict';

    angular
        .module('app')
        .directive('yourQuiz', yourQuiz);

    function yourQuiz() {
        return {
            restrict: 'E',
            templateUrl: 'features/quiz/yourQuiz.html',
        }
    }
}());
(function () {
    'use strict';

    quizCreateCtrl.$inject = ["$scope", "$state", "$stateParams", "$log", "dataSvc"];
    angular
        .module('app')
        .controller('quizCreateCtrl', quizCreateCtrl);

    /** @ngInject */
    function quizCreateCtrl($scope, $state, $stateParams, $log, dataSvc) {
        var bulkMgr = dataSvc.manageBulkAdd();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var topicMgr = dataSvc.manageTopics();

        var vm = this;

        vm.bulkAdd = null;
        vm.isNewReference = null;
        vm.isNewSection = null;
        vm.isNewTopic = null;
        vm.selectedReference = null;
        vm.selectedSection = null;
        vm.topic = {};

        vm.addQuestion = addQuestion;           // Add new empty question to section
        vm.addReference = addReference;         // Add new empty reference to topic
        vm.addSection = addSection;             // Add new empty section to selected reference
        vm.bulkAddQuestions = bulkAddQuestions;  // Bulk add questions
        vm.createTopic = createTopic;           // Save new topic
        vm.delQuestion = delQuestion;           // Delete a question
        vm.delReference = delReference;         // Delete a reference
        vm.delSection = delSection;             // Delete a section
        vm.delTopic = delTopic;                 // Delete a topic
        vm.setActiveTab = setActiveTab;         // Set active nav pill
        vm.setReference = setReference;         // Set selected reference for sections view
        vm.setSection = setSection;             // Set selected section for questions view
        vm.updateQuestion = updateQuestion;     // Save changes to a question onBlur
        vm.updateReference = updateReference;   // Save changes to a reference onBlur
        vm.updateSection = updateSection;       // Save changes to a section onBlur

        _init();

        function _init() {
            if ($stateParams.topicId !== undefined) {
                topicMgr.get({ id: $stateParams.topicId }, function (data) {
                    vm.topic = data;
                    vm.isNewTopic = false;
                });
            } else {
                vm.topic = {
                    title: '',
                    description: '',
                    references: []
                };
            } // end ifElse
            vm.isNewTopic = vm.topic.id === undefined ? true : false;
            setActiveTab('topic');
        }

        function addQuestion() {
            var newQuestion = {
                sectionId: vm.selectedSection.id,
                question: '',
                answer: ''
            };
            vm.selectedSection.questions.push(newQuestion);
        }

        function addReference() {
            var newReference = {
                topicId: vm.topic.id,
                title: '',
                description: '',
                sections: []
            };
            vm.topic.references.push(newReference);
        }

        function addSection() {
            var newSection = {
                referenceId: vm.selectedReference.id,
                title: '',
                description: '',
                questions: []
            };
            vm.selectedReference.sections.push(newSection);
        }

        function bulkAddQuestions() {
            if (vm.bulkAdd !== '') {
                var bulk = {
                    sectionId: vm.selectedSection.id,
                    bulk: vm.bulkAdd
                };
                bulkMgr.send(bulk, function (data) {
                    vm.selectedSection.questions = data;
                    vm.bulkAdd = '';
                    vm.showBulkAdd = false;
                });
            }
        }

        function createTopic() {
            if (vm.topic.title != '' && vm.isNewTopic) {
                topicMgr.save(vm.topic, function (data) {
                    vm.topic = data;
                    vm.isNewTopic = false;
                    setActiveTab('references');
                });
            } else if (vm.topic.title != '' && !vm.isNewTopic) {
                topicMgr.update({ id: vm.topic.id }, vm.topic, function () {
                    setActiveTab('references');
                });
            }
        }

        function delQuestion(q) {
            var i = vm.selectedSection.questions.indexOf(q);
            if (q.id !== undefined) {
                questionMgr.delete({ id: q.id });
            }
            vm.selectedSection.questions.splice(i, 1);
        }

        function delReference(ref) {
            var i = vm.topic.references.indexOf(ref);
            if (ref.id !== undefined) {
                referenceMgr.delete({ id: ref.id });
            }
            vm.topic.references.splice(i, 1);
        }

        function delSection(sect) {
            var i = vm.selectedReference.sections.indexOf(sect);
            if (sect.id !== undefined) {
                sectionMgr.delete({ id: sect.id });
            }
            vm.selectedReference.sections.splice(i, 1);
        }

        function delTopic(topic) {
            topicMgr.delete({ id: topic.id }, function () {
                _init();
            });
        }

        function setActiveTab(activeTab) {
            vm.activeTab = activeTab;
        }

        function setReference(ref) {
            vm.selectedReference = ref;
            vm.setActiveTab('sections');
        }

        function setSection(sect) {
            vm.selectedSection = sect;
            vm.setActiveTab('questions');
        }

        function updateQuestion(q) {
            if (q.id !== undefined) {
                questionMgr.update({ id: q.id }, q);
            } else if (q.question !== '' && q.answer !== '') {
                questionMgr.save(q, function (data) {
                    var i = vm.selectedSection.questions.indexOf(q);
                    vm.selectedSection.questions[i].id = data.id;
                });
            }
        }

        function updateReference(ref) {
            if (ref.id !== undefined) {
                referenceMgr.update({ id: ref.id }, ref);
            } else if (ref.title !== '') {
                referenceMgr.save(ref, function (data) {
                    var i = vm.topic.references.indexOf(ref);
                    vm.topic.references[i].id = data.id;
                });
            }
        }

        function updateSection(sect) {
            if (sect.id !== undefined) {
                sectionMgr.update({ id: sect.id }, sect);
            } else if (sect.title !== '') {
                sectionMgr.save(sect, function (data) {
                    var i = vm.selectedReference.sections.indexOf(sect);
                    vm.selectedReference.sections[i].id = data.id;
                });
            }
        }
    }

}());
(function () {
    'use strict';

    quizGenCtrl.$inject = ["$scope", "dataSvc", "$log"];
    angular
        .module('app')
        .controller('quizGenCtrl', quizGenCtrl);

    /** @ngInject */
    function quizGenCtrl($scope, dataSvc, $log) {
        var topicMgr = dataSvc.manageTopics();
        var referenceMgr = dataSvc.manageReferences();
        var sectionMgr = dataSvc.manageSections();
        var questionMgr = dataSvc.manageQuestions();
        var quizGenMgr = dataSvc.quizGen();
        var quizSubMgr = dataSvc.checkQuiz();

        var vm = this;

        vm.quizMode = false;
        vm.quizSubmission = [];
        vm.selectedSections = [];
        vm.numberOfQuestions = 25;

        vm.generateQuiz = generateQuiz;
        vm.gradeQuiz = gradeQuiz;
        vm.loadTopic = loadTopic;
        vm.selectSection = selectSection;

        init();

        function init() {
            vm.topics = topicMgr.query();
        }

        function generateQuiz() {
            vm.showResults = false;
            var quizSelectors = { 
                sections: vm.selectedSections, 
                numberOfQuestions: vm.numberOfQuestions 
            };
            quizGenMgr.save(quizSelectors, function (quiz) {
                vm.quiz = quiz;
                // vm.quizMode = true;
            });
        }

        function gradeQuiz() {
            vm.quizSubmission = [];
            var i = 0, arrLen = vm.quiz.questions.length;
            for (; i < arrLen; i++) {
                var q = vm.quiz.questions[i];
                var newSub = {
                    questionId: q.questionId,
                    sectionId: q.sectionId,
                    selected: q.selected
                };
                vm.quizSubmission.push(newSub);
            }
            var s = { submission: vm.quizSubmission };
            quizSubMgr.send(s, function (data) {
                vm.quizResults = data;
                vm.showResults = true;
                var correct = 0;
                var incorrect = 0;
                for (var i = 0; i < vm.quizResults.length; i++) {
                    var question = vm.quizResults[i];
                    question.selAnswer === question.corAnswer ? correct += 1 : incorrect += 1;
                }
                vm.score = correct / (correct + incorrect) * 100;
            });


        }

        function loadTopic() {
            referenceMgr.query({ topicId: vm.selectedTopic.id }, function (data) {
                vm.references = data;
                var i = 0, arrLen = vm.references.length;
                for (; i < arrLen; i++) {
                    var n = 0, arrLen1 = vm.references[i].sections.length;
                    for (; n < arrLen1; n++) {
                        $log.log('vm.references[i].sections[n]', vm.references[i].sections[n]);
                        vm.references[i].sections[n].selected = true;
                        vm.selectedSections.push(vm.references[i].sections[n]);
                    }
                }
            });

        }

        function selectSection(sect) {
            $log.log('selectSection', selectSection);

            var i = vm.selectedSections.indexOf(sect);
            if (i === -1) {
                vm.selectedSections.push(sect);
            } else {
                vm.selectedSections.splice(i, 1);
            }
        }
    }

}());
(function(){
    'use strict';

    newProjectCtrl.$inject = ["$scope", "dataSvc", "$log", "$state", "$window"];
    angular
        .module('app')
        .controller('newProjectCtrl', newProjectCtrl);

    /** @ngInject */
    function newProjectCtrl($scope, dataSvc, $log, $state, $window){
        var projMgr = dataSvc.manageProjs();
        var vm = this;
        
        vm.categories = [];
        vm.addCategory = addCategory;
        vm.removeCategory = removeCategory;
        vm.submitCategory = submitCategory;
        vm.teams = dataSvc.teams;

        vm.new = {};
        vm.submit = submitProject;
        
        function addCategory(category) {
            if (vm.categories.indexOf(category) == -1) {
                vm.categories.push(category);
                vm.addedCategory = "";
                $window.document.getElementById('newcategory').focus();
            };
        };
        
        function removeCategory(category) {
            var i = vm.categories.indexOf(category);
            vm.categories.splice(i, 1);
        };
        
        function submitCategory(category) {
            if (category == 'other') {
                vm.newCategory = true;
            }
            else if (vm.categories.indexOf(category) == -1 ) {
                vm.categories.push(category);
                vm.submittedCategory = "";
            }
            else {
                vm.categories.pop(category);
                vm.submittedCategory = "";
            };

            vm.addedCategory = "";
        };

        function submitProject() {
            vm.new.categories = "";
            angular.forEach(vm.categories, function (val, i) {
                if (i !== vm.categories.length - 1) {
                    vm.new.categories = vm.new.categories + val + ",";
                }
                else {
                    vm.new.categories = vm.new.categories + val;
                };
            });
            
            projMgr.save(vm.new, function (data) {
                $log.log('saving');
                $state.transitionTo('app.projects.details', { id: data.id }, { reload: true });
            });
        };
    };

}());
(function () {
    'use strict';

    projectDetsCtrl.$inject = ["dataSvc", "$stateParams", "$log", "$scope", "$state", "$document", "$timeout"];
    angular
        .module('app')
        .controller('projectDetsCtrl', projectDetsCtrl);

    /** @ngInject */
    function projectDetsCtrl(dataSvc, $stateParams, $log, $scope, $state, $document, $timeout) {
        var attachMgr = dataSvc.manageAttachments();
        var commentMgr = dataSvc.manageComments();
        var linkMgr = dataSvc.manageLinks();
        var projMgr = dataSvc.manageProjs();
        var taskMgr = dataSvc.manageTasks();
        var teamMgr = dataSvc.manageTeam();

        $scope.assignedUsers = [];
        $scope.curUser = dataSvc.getCurUser();
        $scope.newComment = {};
        $scope.newLink = {};
        $scope.newTask = {};
        $scope.showDetails = false;
        $scope.taskSelected = null;
        // $scope.teamFeedback = ""
        $scope.teams = dataSvc.teams;
        $scope.teamMembers = [];

        // $scope.addTeamMembers = addTeamMembers;     // Add a user to a project
        $scope.assignTask = assignTask;             // Assign a user to a task
        $scope.delAssignment = delAssignment;       // Delete a user from a task assignment
        $scope.delComment = delComment;             // Delete a comment
        $scope.delLink = delLink;                   // Delete a link
        $scope.delProject = delProject;             // Delete a project
        $scope.delTask = delTask;                   // Delete a task
        // $scope.delTeamMember = delTeamMember;       // Remove team member from project
        $scope.projectComplete = projectComplete;   // Mark project complete
        $scope.saveAssignments = saveAssignments;   // Save users assigned to a task 
        $scope.saveComment = saveComment;           // Save a new comment
        $scope.saveResource = saveResource;         // Save a new resource
        $scope.saveTask = saveTask;                 // Save a new task
        $scope.taskComplete = taskComplete;          // Mark task complete
        $scope.toggleDetails = toggleDetails;       // Show/hide task details
        $scope.toggleLead = toggleLead;             // Toggle user as a project lead
        $scope.unassignTask = unassignTask;         // Remove a user from a task
        $scope.updateProj = updateProj;             // Save changes to project details
        $scope.uploadFiles = uploadFiles;           // Upload file attachments

        init();

        function init() {
            if ($stateParams.id) {
                $scope.project = projMgr.get({ id: $stateParams.id }, function (project) {
                    populateChart(project);
                    $scope.newTask = {
                        title: "",
                        description: "",
                        priority: "Normal",
                        projectId: project.id
                    };
                    $scope.teamMembers = dataSvc.getTeamMembers(project.team);
                });
            } else {
                $scope.newTask = {
                    title: "",
                    description: "",
                    priority: "Normal",
                    projectId: $scope.project.id
                };
                populateChart($scope.project);
                $scope.teamMembers = dataSvc.getTeamMembers($scope.project.team);
            }
        }

        function populateChart(project) {
            // Set up work items chart
            $scope.chart = [];
            $scope.labels = ["Complete", "Incomplete"];
            $scope.complete = 0;
            $scope.incomplete = 0;
            angular.forEach(project.workItems, function (item) {
                if (item.complete) {
                    $scope.complete += 1;
                }
                else {
                    $scope.incomplete += 1;
                };
            });
            $scope.chart.push($scope.complete);
            $scope.chart.push($scope.incomplete);
        }

        function addTeamMembers(user) {
            var teamMember = {
                projectId: $scope.project.id,
                sailorId: user.id,
                userName: user.userName,
                rateName: user.rateName
            };
            teamMgr.save(teamMember, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        }

        function assignTask(user) {
            $scope.assignedUsers.push(user);
        }
        // Testing task assignment after task creation
        $scope.a = a;
        function a(user, task) {
            if (user) {
                var submission = {
                    workItemId: task.id,
                    sailorId: user.id,
                    userName: user.userName,
                    rateName: user.rateName
                };

                var taskIndex = $scope.project.workItems.indexOf(task);

                teamMgr.save(submission, function (data) {
                    try {
                        $scope.project.workItems[taskIndex].assignedUsers.push(data);
                    } catch (error) {
                        $scope.project.workItems[taskIndex].assignedUsers = [];
                        $scope.project.workItems[taskIndex].assignedUsers.push(data);
                    }
                });
            }
        }

        function delAssignment(teamMember, task) {
            teamMgr.delete({ id: teamMember.id }, function () {
                var t = $scope.project.workItems.indexOf(task);
                var u = $scope.project.workItems[t].assignedUsers.indexOf(teamMember);

                // $timeout(function() {
                if ($scope.project.workItems[t].assignedUsers.length === 1) {
                    $scope.project.workItems[t].assignedUsers = [];
                } else {
                    $scope.project.workItems[t].assignedUsers.splice(u, 1);
                }
                $scope.taskSelected = null;
                // })
            });
        }

        function delComment(comment) {
            var i = _findTaskIndex(comment.workItemId);
            var c = $scope.project.workItems[i].comments.indexOf(comment);

            commentMgr.delete({ id: comment.id }, function () {
                $scope.project.workItems[i].comments.splice(c,1);
            });
        }

        function delLink(id) {
            linkMgr.delete({ id: id }, function (data) {
                var i = $scope.project.links.indexOf(data);
                $scope.project.links.splice(i, 1);
            });
        }

        function delProject() {
            projMgr.delete({ id: $scope.project.id }, function () {
                $state.transitionTo('app.projects', {}, { reload: true });
            });
        }

        function delTask(task) {
            taskMgr.delete({ id: task.id }, function () {
                var i = $scope.project.workItems.indexOf(task);
                $scope.project.workItems.splice(i, 1);
            });
        }

        function delTeamMember(id) {
            teamMgr.delete({ id: id }, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        }

        function projectComplete(val) {
            $scope.project.complete = val;
            projMgr.update({ id: $scope.project.id }, $scope.project);
        }

        function saveAssignments(workItemId) {
            angular.forEach($scope.assignedUsers, function (user) {
                var submission = {
                    workItemId: workItemId,
                    sailorId: user.id,
                    userName: user.userName,
                    rateName: user.rateName
                };
                teamMgr.save(submission, function (data) {
                    try {
                        var i = $scope.project.workItems.length - 1
                        $scope.project.workItems[i].assignedUsers.push(data);
                    } catch (error) {
                        var i = $scope.project.workItems.length - 1
                        $scope.project.workItems[i].assignedUsers = [data];
                    }
                });
            });
        }

        function saveComment(workItem) {
            $scope.newComment.author = $scope.curUser.rateName;
            $scope.newComment.created = new Date();

            var i = _findTaskIndex($scope.newComment.workItemId);

            commentMgr.save($scope.newComment, function (comment) {
                if ($scope.project.workItems[i].comments.length) {
                    $scope.project.workItems[i].comments.push(comment)
                } else {
                    $scope.project.workItems[i].comments = [comment]
                }
            });
            angular.element('#newCommentModal').modal('hide');
            $scope.newComment = {};
        }

        function saveResource() {
            if ($scope.newLink.url != null) {
                $scope.newLink.projectId = $scope.project.id;
                linkMgr.save($scope.newLink, function (data) {
                    $scope.project.links.push(data);
                });
            }
            angular.element('#newLinkModal').modal('hide');
        }

        function saveTask() {
            taskMgr.save($scope.newTask, function (response) {

                $scope.project.workItems.push(response);
                saveAssignments(response.id);
                $scope.incomplete++;
                $scope.chart = [];
                $scope.chart.push($scope.complete);
                $scope.chart.push($scope.incomplete);
                $scope.newTaskFeedback = "Task successfully created: " + response.title;
                $scope.newTask.title = "";
                $scope.newTask.description = "";
                $scope.newTask.priority = "Normal";
                $scope.assignedUsers = [];
            });
        }

        function taskComplete(task, val) {
            task.complete = val;
            taskMgr.update({ id: task.id }, task, function () {
                init();
            });
        }

        function toggleDetails() {
            $scope.showDetails = !$scope.showDetails;
        }

        function toggleLead(user) {
            if (user.projectLead) {
                user.projectLead = false;
            }
            else {
                user.projectLead = true;
            };
            teamMgr.update({ id: user.id }, user, function () {
                $scope.project.teamMembers = teamMgr.query({ projectId: $scope.project.id });
            });
        }

        function unassignTask(user, index) {
            $scope.assignedUsers.splice(index, 1);
        }

        function updateProj(assignedTeam) {
            $scope.editTitle = false;
            $scope.editDescription = false;
            projMgr.update({ id: $scope.project.id }, $scope.project, function (project) {
                // $scope.teamFeedback = "Successfully assigned to " + project.team + " team"
                $scope.editTeam = false;
            });
        }

        function uploadFiles(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function (file) {
                // attachMgr.save(file)
                $log.log(file);

                // file.upload = Upload.upload({
                //     url: 'http://localhost:5000/api/Attachments',
                //     data: { file: file }
                // });

                // file.upload.then(function (response) {
                //     $timeout(function () {
                //         file.result = response.data;
                //     });
                // }, function (response) {
                //     if (response.status > 0)
                //         $scope.errorMsg = response.status + ': ' + response.data;
                // }, function (evt) {
                //     file.progress = Math.min(100, parseInt(100.0 *
                //         evt.loaded / evt.total));
                // });
            });
        }

        function _findTaskIndex(taskId) {
            for (var i = 0; i < $scope.project.workItems.length; i++) {
                var task = $scope.project.workItems[i];
                console.table(task);
                console.log('task.id', task.id);
                console.log('taskid', taskId);
                if (task.id === taskId) {
                    var i = $scope.project.workItems.indexOf(task);
                    return i;
                };
            };
        }
    }

}());
(function () {
    'use strict';

    projectListCtrl.$inject = ["$scope", "dataSvc", "$log", "$uibModal", "$document", "authService", "$filter"];
    angular
        .module('app')
        .controller('projectListCtrl', projectListCtrl);

    /** @ngInject */
    function projectListCtrl($scope, dataSvc, $log, $uibModal, $document, authService, $filter) {

        var projMgr = dataSvc.manageProjs();
        var username = $filter('lowercase')(authService.authentication.userName);
        var vm = this;

        vm.curUser = dataSvc.getCurUser();
        vm.data = {};
        vm.newProject = {};
        vm.yourProjs = [];
        vm.completedProjs = [];
        vm.incompleteProjs = [];

        init();

        function init() {
            // ** Filter projects the user is part of and push to yourProjs[] **
            vm.data = projMgr.query(function (data) {
                // Iterate through each project
                angular.forEach(data, function (project) {
                    if (project.team === vm.curUser.team) {
                        vm.yourProjs.push(project);
                    };
                });
                for (var i = 0; i < data.length; i++) {
                    var proj = data[i];
                    //proj.complete ? vm.completedProjs.push(proj) : vm.incompleteProjs.push(proj);
                    if (proj.complete) {
                        vm.incompleteProjs.push(proj);
                    } else {
                        vm.completedProjs.push(proj);
                    }
                }
            });
            
        };

    };

}());

// **** TODO: projectsCtrl ****
// Resolve vm.data before initilizing
// Filter projects by current or past
// Add date created/modifed to back end

(function () {
    'use strict';

    angular
        .module('app')
        .directive('projectDetails', projectDetails)
        .directive('projectList', projectList)
        .directive('yourProjects', yourProjects);

    function projectDetails() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/projectDetails.html',
            controller: 'projectDetsCtrl',
            scope: {
                project: '=project'
            }
        };
    }

    function projectList() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/projectlist.html'
        };
    }

    function yourProjects() {
        return {
            restrict: 'E',
            templateUrl: 'features/projects/yourProjects.html',
            controller: 'projectListCtrl',
            controllerAs: 'vm'
        };
    }
}());
angular.module('app')
.controller('rosterCtrl', rosterCtrl);

rosterCtrl.$inject = ['$scope', 'dataSvc'];
function rosterCtrl ($scope, dataSvc) {
    
    $scope.sailors = dataSvc.getUsers();

    // Default settings for table column display
    $scope.showRate = true;
    $scope.showName = true;
    $scope.showTeam = true;
    $scope.showPhone = true;
    $scope.showAdsd = false;
    $scope.showPrd = true;
    $scope.showEaos = true;
    $scope.showReportDate = true;
    $scope.showRank = false;
    $scope.showEmail = false;
    $scope.showAddress = false;
    $scope.showRankDate = false;
    $scope.showBlueBadge = false;
    $scope.showDestUic = false;
    $scope.showDestCommand = false;
    $scope.showPortalRoles = false;
    
    // Table column presets
    $scope.presetOpt = '';
    $scope.setPreset = setPreset;

    // Sort table by
    $scope.propertyName = ['rate', 'lastName'];
    $scope.reverse = false;
    $scope.sortBy = sortBy;


    function setPreset (opt) {
        switch (opt) {
            case 'recall':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = true;
                $scope.showAddress = true;
                $scope.showPhone = true;
                $scope.showRankDate = false;
                $scope.showAdsd = false;
                $scope.showPrd = false;
                $scope.showEaos = false;
                $scope.showReportDate = false;
                $scope.showBlueBadge = false;
                $scope.showDestUic = false;
                $scope.showDestCommand = false;
                $scope.showPortalRoles = false;
                break;
            case 'admin':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = false;
                $scope.showAddress = false;
                $scope.showPhone = false;
                $scope.showRankDate = true;
                $scope.showAdsd = true;
                $scope.showPrd = true;
                $scope.showEaos = true;
                $scope.showReportDate = true;
                $scope.showBlueBadge = false;
                $scope.showDestUic = false;
                $scope.showDestCommand = false;
                $scope.showPortalRoles = false;
                break;
            case 'destination':
                $scope.showRate = true;
                $scope.showRank = false;
                $scope.showName = true;
                $scope.showEmail = false;
                $scope.showAddress = false;
                $scope.showPhone = false;
                $scope.showRankDate = false;
                $scope.showAdsd = false;
                $scope.showPrd = false;
                $scope.showEaos = false;
                $scope.showReportDate = true;
                $scope.showBlueBadge = true;
                $scope.showDestUic = true;
                $scope.showDestCommand = true;
                $scope.showPortalRoles = false;
                break;
        };
    };


    function sortBy (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
};

angular
    .module('app')
    .controller('sailorDetsCtrl', sailorDetsCtrl);

sailorDetsCtrl.$inject = ['$scope', '$state', '$stateParams', 'dataSvc'];
function sailorDetsCtrl($scope, $state, $stateParams, dataSvc) {

    var userMgr = dataSvc.manageUser();

    $scope.addedRole = "";
    $scope.addRole = addRole;
    $scope.deleteUser = deleteUser;
    $scope.addedTeam = "";
    $scope.roles = dataSvc.getRoles();
    $scope.sailor = {};
    $scope.teams = dataSvc.teams;
    $scope.teamFeedback = "";
    $scope.updateUser = updateUser;

    init();

    function init() {
        $scope.sailor = userMgr.get({ id: $stateParams.id }, function (data) {
            $scope.newSailor = data; // Used to update existing sailor
        });
    };

    function addRole() {
        dataSvc.addRole().save({ id: $scope.addedRole, enrolledUser: $scope.sailor.id }, function () {
            $scope.sailor = userMgr.get({ id: $stateParams.id });
        });
        $scope.addedRole = ""; // Reset dropdown menu in view
    };

    function deleteUser() {
        userMgr.delete({ id: $stateParams.id }, function () {
            $state.transitionTo('app.reports.roster', {}, { reload: true });
        });
    };

    function updateUser(teamChange) {
        userMgr.update({ id: $stateParams.id }, $scope.newSailor, function (data) {
            $scope.sailor = data;
            if (teamChange) {
                $scope.teamFeedback = "Successfully assigned to " + data.team + " team"
            }
        });
        $scope.enableEdit = false;
    };
};
