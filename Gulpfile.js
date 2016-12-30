var gulp = require('gulp');
var clean = require('gulp-clean');
var typescript = require('gulp-typescript');
var mocha = require('gulp-mocha');

var config = {
  src: [
    'lib/src/**/*.ts',
  ],
  dest: 'lib/dest',
};

gulp.task('clean', function() {
  return gulp.src(config.dest)
    .pipe(clean());
});

gulp.task('typescript', ['clean'], function() {
  return gulp.src(config.src)
    .pipe(typescript({
      module: 'commonjs',
      target: 'ES6',
      typescript: require('typescript')
    }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('build', function() {
  gulp.start('typescript');
});

gulp.task('test', ['typescript'], function() {
  gulp.src(config.dest + '/**/*.spec.js')
    .pipe(mocha({ reporter: 'spec' }))
});

gulp.task('default', ['clean'], function() {
  gulp.start('typescript');
  gulp.watch([
    config.src
  ], ['typescript']);
});
