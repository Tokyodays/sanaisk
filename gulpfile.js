'use strict';
// generated on 2015-01-08 using generator-gulp-bootstrap 0.0.4

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.scss')
        .pipe($.sass({
          errLogToConsole: true,
          outputStyle: 'compressed'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.size())
        .pipe(gulp.dest('dist/public/styles'))
        .pipe(reload({stream:true}))
        .pipe($.notify("Compilation complete."));;
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.size())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({stream:true}));
});

gulp.task('bowercopy', function() {
  return gulp.src('app/bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components/'))
});

gulp.task('jade', function() {

  return gulp.src('app/jade/*.jade')
    .pipe($.jade())
    .pipe(gulp.dest('dist/'))
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
      .pipe($.cache($.imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
      })))
      .pipe($.size())
      .pipe(gulp.dest('dist/public/images'))
      .pipe(reload({stream:true, once:true}))
});

gulp.task('icomoon', function () {
  return gulp.src('app/icons/fonts/*')
    .pipe(gulp.dest('dist/public/styles/fonts'));
});
gulp.task('icostyle', function () {
  return gulp.src('app/icons/style.css')
    .pipe(gulp.dest('dist/public/styles'))
});

gulp.task('clean', function () {
    return gulp.src(['dist/public/*'], { read: false }).pipe($.clean());
});

gulp.task('build', gulpSequence('clean', 'bowercopy', 'jade', 'images', ['icomoon', 'icostyle'], 'styles', 'scripts'));

gulp.task('default', ['watch'], function () {
    //gulp.start('build');
});

gulp.task('serve', ['build'], function () {
    browserSync.init(null, {
        server: {
          baseDir: 'dist/public',
          directory: true
        },
        debugInfo: true,
        open: true,
        xip: true
    });
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['serve'], function () {

    //watch for changes
    gulp.watch(['app/*.html'], reload);

    gulp.watch('app/jade/**/*.jade', ['jade']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
