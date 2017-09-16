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

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('scss/**/*.scss', ['sass']);

    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('features/**/*.html').on('change', browserSync.reload);

    gulp.watch('js/*.js', ['concat:dev'])
    gulp.watch('js/**/*.js', ['concat:dev'])
    gulp.watch('features/**/*.js', ['concat:dev'])
});

// Static Server without watching scss files
gulp.task('serve:lite', function () {

    browserSync.init({
        server: "./"
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

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss');
});

gulp.task('clean:dist', function () {
    return del(paths.dist);
});

gulp.task('copy:bower', function () {
    return gulp.src(mainBowerFiles(['**/*.js', '!**/*.min.js']))
        .pipe(gulp.dest(paths.dist + '/js/libs'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist + '/js/libs'));
});

gulp.task('copy:css', function () {
    return gulp.src('./css/**/*')
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('copy:img', function () {
    return gulp.src('./img/**/*')
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('copy:fonts', function () {
    return gulp.src('./fonts/**/*')
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('concat:dist', function () {
    gulp.src(
        ['js/app.js', 
        'js/*.js', 
        'js/**/*.js', 
        'features/**/*.js'])
        .pipe(concat('compiled.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(paths.dist));
})

gulp.task('concat:dev', function () {
    gulp.src(
        ['js/app.js', 
        'js/*.js', 
        'js/**/*.js', 
        'features/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('compiled.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
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
        .pipe(gulp.dest('./'));
});

gulp.task('build:dist', function (callback) {
    runSequence('clean:dist', 'copy:bower', 'copy:css', 'copy:img', 'copy:fonts', 'concat:js', 'copy:views', 'copy:html', 'replace:bower', callback);
});

gulp.task('cs', function (callback) {
    runSequence('concat:dev', 'serve', callback);
});

gulp.task('default', ['serve']);
