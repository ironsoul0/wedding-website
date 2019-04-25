'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var browserSync = require('browser-sync');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// default task
gulp.task('default', ['sass', 'minify-js']);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
})

gulp.task('watch', ['browserSync'], function() {
    gulp.watch(['./index.html', './js/scripts.js', './sass/**/*.scss'], ['minify-js', 'sass', browserSync.reload]);
})

gulp.task('build', ['minify-js', 'sass'], function() {
    return gulp.src([
        './**/*',         //select all files
        '!./**/node*/',      //exclude folders starting with '_'
        '!./**/node*/**/*',  //exclude files/subfolders in folders starting with '_'
        '!./**/sass*/',      //exclude folders starting with '_'
        '!./**/sass*/**/*',  //exclude files/subfolders in folders starting with '_'
    ])
    .pipe(gulp.dest('build'));
})