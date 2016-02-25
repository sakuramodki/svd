'use strict';

var LESS_DIR = './less';
var CSS_DIR = './css';

var path = require('path');

var gulp = require('gulp');
var logger = require('gulp-logger');
var watch = require('gulp-watch');
var lessDependents = require('gulp-less-dependents');
var filter = require('gulp-filter');
var lessc = require('gulp-less');

var browserSync = require('browser-sync');

gulp.task('less', function() {
    browserSync({
        server: {
            baseDir: "./" // ルートとなるディレクトリを指定
        }
    });

    gulp.src(path.join(LESS_DIR, '**/*.less'), { base: LESS_DIR })
        .pipe(watch(path.join(LESS_DIR, '**/*.less')))
        .pipe(lessDependents())
        .pipe(filter([ '*', '!**/_*.less' ]))
        .pipe(lessc())
        .pipe(gulp.dest(CSS_DIR))
        .pipe(logger({ beforeEach: '[less] wrote: ' }));

    gulp.watch("css/agency.css").on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});
