'use strict';

var fs       = require('fs');
var gulp     = require('gulp');
var jscs     = require('gulp-jscs');
var mocha    = require('gulp-mocha');
var path     = require('path');
// var webpack  = require('gulp-webpack-build');

require('babel/register');
require('coffee-script/register');

var DEST = 'dist/';
var TEMP = './tmp/';

gulp.task('lint', function() {
  var args = {
    configPath: './.jscs.json',
    esnext: true
  }
  return gulp.src('./client/**/*.js')
    .pipe(jscs(args));
});

gulp.task('test', function() {
  var mochaOptions = {
    reporter: 'nyan'
  }
  return gulp.src('./test/**/*_spec.*', {read: false})
    .pipe(mocha(mochaOptions));
});

gulp.task('test-watch', function() {
  gulp.watch(['client/**', 'server/**', 'test/**'], ['test']);
});

gulp.task('bundle', function() {
  var banner = fs.readFileSync(TEMPLATES + 'banner.js', 'utf8');
  return gulp.src('webpack.config.js')
    .pipe(webpack.compile())
    .pipe(header(banner))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['test', 'lint']);
