// Karma configuration
// Generated on Fri Nov 17 2017 22:11:23 GMT-0500 (Eastern Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',

      // Dependencies
      "bower_components/angular-ui-router/release/angular-ui-router.min.js",
      "bower_components/oclazyload/dist/ocLazyLoad.min.js",
      "bower_components/angular-animate/angular-animate.min.js",
      "bower_components/angular-bootstrap/ui-bootstrap.min.js",
      "bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js",
      "bower_components/angular-loading-bar/build/loading-bar.min.js",
      "bower_components/angular-resource/angular-resource.min.js",
      "bower_components/angular-local-storage/dist/angular-local-storage.min.js",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",

      'js/app.js',
      'js/**/*.js',
      'features/**/*.js',
      'spec/**/*spec.js',

      '/features/**/*',
      'views/**/*',
      'index.html',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
