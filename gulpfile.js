/*jshint -W097 */
/*jshint -W117 */
"use strict";

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    sassPath = "./assets/style/**/*.scss",
    typescriptPath = "./assets/script/**/*.ts";

gulp.task('default', ['watch', 'connect']);

gulp.task('watch', function() {
    gulp.watch(sassPath, ['sass']);
    gulp.watch(typescriptPath, ['typescript']);
});

gulp.task('connect', function() {
    connect.server({}, function() {
        browserSync.init({
            proxy: '127.0.0.1:8000',
            open: false,
            notify: false,
            ui: {
                port: 8888
            }
        });
    });
    gulp.watch(['**/*.php', '**/*.html']).on('change', function() {
        browserSync.reload();
    });
});
gulp.task('sass', function() {
    return gulp.src(sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.stream());
});
gulp.task('typescript', function() {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});

gulp.task('build', function() {
    gulp.src('assets/script/ts/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['.min.js'],
            output: {
                comments: false
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/script'));
});
