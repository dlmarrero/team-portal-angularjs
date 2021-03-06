'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps')
var ngAnnotate = require('gulp-ng-annotate')
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var eslint = require("gulp-eslint");

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

gulp.task('replace:devVars', function () {
    gulp.src('js/services/auth.svc.js',  {base: "./"})
        .pipe(replace("  // var serviceBase = 'http://localhost:5000/';", "  var serviceBase = 'http://localhost:5000/';"))
        .pipe(replace("  var serviceBase = 'portal';", "  // var serviceBase = 'portal';"))
        .pipe(gulp.dest('./'));
    gulp.src('js/services/data.svc.js',  {base: "./"})
        .pipe(replace("  // var aspApiUrl = 'http://localhost:5000';", "  var aspApiUrl = 'http://localhost:5000';"))
        .pipe(replace("  var aspApiUrl = 'portal';", "  // var aspApiUrl = 'portal';"))
        .pipe(gulp.dest('./'))
});

gulp.task('replace:prodVars', function () {
    gulp.src('js/services/auth.svc.js',  {base: "./"})
        .pipe(replace("  var serviceBase = 'http://localhost:5000/';", "  // var serviceBase = 'http://localhost:5000/';"))
        .pipe(replace("  // var serviceBase = 'portal';", "  var serviceBase = 'portal';"))
        .pipe(gulp.dest('./'));
    gulp.src('js/services/data.svc.js',  {base: "./"})
        .pipe(replace("  var aspApiUrl = 'http://localhost:5000';", "  // var aspApiUrl = 'http://localhost:5000';"))
        .pipe(replace("  // var aspApiUrl = 'portal';", "  var aspApiUrl = 'portal';"))
        .pipe(gulp.dest('./'))
});

gulp.task('eslint', function () {
    return gulp.src(
        ['js/app.js', 
        'js/*.js', 
        'js/**/*.js', 
        'features/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format('stylish'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('scss/**/*.scss', ['sass']);

    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('features/**/*.html').on('change', browserSync.reload);
    gulp.watch('views/**/*.html').on('change', browserSync.reload);

    gulp.watch('js/*.js', ['concat:dev'])
    gulp.watch('js/**/*.js', ['concat:dev'])
    gulp.watch('features/**/*.js', ['concat:dev'])
});

// Static Server without watching scss files
gulp.task('serve:lite', function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('dist:sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dist + '/css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss');
});

gulp.task('clean:dist', function () {
    return del(paths.dist);
});

gulp.task('copy:bower', function () {
    return gulp.src('./bower_components/**/*.min.js')
        .pipe(rename({dirname: ""}))
        .pipe(gulp.dest(paths.dist + '/js/libs'))
        // .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest(paths.dist + '/js/libs'));
});

gulp.task('copy:css', function () {
    return gulp.src('./css/*')
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('copy:img', function () {
    return gulp.src('./img/*')
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('copy:fonts', function () {
    return gulp.src('./fonts/**/*')
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('concat:dist', function () {
    gulp.src(
        ['./js/app.js', 
        './js/*.js', 
        './js/**/*.js', 
        './features/**/*.js'])
        .pipe(concat('compiled.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
})

gulp.task('concat:dev', function () {
    gulp.src(
        ['js/app.js', 
        'js/*.js', 
        './js/**/*.js', 
        'features/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('compiled.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
})

gulp.task('copy:js', function () {
    return gulp.src('./js/**/*')
        .pipe(gulp.dest(paths.dist + '/js'));
})

gulp.task('copy:features', function () {
    return gulp.src('./features/**/**/*')
        .pipe(gulp.dest(paths.dist + '/features'));
})

gulp.task('copy:views', function () {
    return gulp.src('./views/**/*')
        .pipe(gulp.dest(paths.dist + '/views'));
});

gulp.task('copy:html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('replace:bower', function () {
    return gulp.src([
        './dist/**/*.html',
        './dist/**/*.js',
    ], { base: './' })
        .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
        .pipe(replace('<script src="js/libs/script>', '<script src="js/libs/ui-bootstrap-tpls.min.js"></script>'))
        .pipe(gulp.dest('./'));
});

gulp.task('build:dist', function (callback) {
    runSequence('replace:prodVars', 'clean:dist', 'copy:bower', 'dist:sass', 'copy:css', 'copy:img', 'copy:fonts', 'concat:dist', 'copy:js', 'copy:views', 'copy:features', 'copy:html', 'replace:bower');
});

gulp.task('cs', function (callback) {
    runSequence('replace:devVars', 'concat:dev', 'serve', callback);
});

gulp.task('default', ['serve']);
