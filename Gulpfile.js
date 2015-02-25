var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
 
var scriptsDir = './src';
var buildDir = './js';
 
 function buildScript(file, watch) {
  var props = watchify.args;
  props.entries = [scriptsDir + '/' + file];
  props.debug = true;
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  
  bundler.transform(reactify);

  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
      }))
      .pipe(source(file))
      .pipe(gulp.dest(buildDir));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}
 
 
gulp.task('build', function() {
  return buildScript('app.js', false);
});
 
 
gulp.task('default', ['build'], function() {
  return buildScript('app.js', true);
});