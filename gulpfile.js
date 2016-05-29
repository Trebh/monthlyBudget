'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var haml = require('gulp-haml');

 
 
// Options 
// Change file extension 
gulp.task('haml', function () {
  gulp.src('./app/components/**/*.haml')
    .pipe(haml({ext: '.html'}))
    .pipe(gulp.dest('dist/html'));
});

gulp.task('test', function() {
  return gulp.src('**/*.spec.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it 
    .pipe(jasmine());
}).on('error', function(err){
  console.log(err);
  this.emit('end');
});

gulp.task('styles', function() {
  return sass('./index.scss', {
      style: 'expanded'
    })
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(livereload());
});


gulp.task('images', function() {
    return gulp.src('app/assets/images/**')
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe(livereload());
});

gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/assets', 'dist/html', 'dist/images']);
});


gulp.task('fonts', function() {
    return gulp.src('app/assets/fonts/*.woff')
        .pipe(gulp.dest('dist/assets/fonts/'));
});


gulp.task('scripts', function() {
  return gulp.src(['bower_components/**/*.min.js',
      'app/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});

gulp.task('build-dev', function(callback) {
  sequence('clean', ['test', 'haml', 'styles', 'scripts', 'fonts', 'images'], 'watch', callback);
});

gulp.task('build', function(callback) {
  sequence('clean', ['styles', 'scripts', 'fonts', 'haml' ], callback);
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('**/*.spec.js', ['test']);
  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.sass', ['styles']);
  gulp.watch('app/components/**/*.haml', ['haml']);
  gulp.watch('app/assets/**', ['images']);
  gulp.watch('/index.scss');
  gulp.watch('app/assets/globals/*.sass');

   // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});