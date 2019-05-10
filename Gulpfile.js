const gulp = require('gulp');
const clean = require('gulp-clean');
const typescript = require('gulp-typescript');
const mocha = require('gulp-mocha');

const config = {
  src: ['lib/src/**/*.ts'],
  dest: 'lib/dest'
};

gulp.task(
  'clean',
  gulp.series(function() {
    return gulp.src(config.dest).pipe(clean());
  })
);

gulp.task(
  'typescript',
  gulp.series('clean', function() {
    return gulp
      .src(config.src)
      .pipe(
        typescript({
          module: 'commonjs',
          target: 'ES6',
          typescript: require('typescript')
        })
      )
      .pipe(gulp.dest(config.dest));
  })
);

gulp.task('build', gulp.series('typescript'));

gulp.task(
  'test',
  gulp.series('typescript', function() {
    return gulp
      .src(config.dest + '/**/*.spec.js')
      .pipe(mocha({ reporter: 'spec' }));
  })
);

gulp.task(
  'default',
  gulp.series('clean', 'typescript', function() {
    gulp.watch([config.src], ['typescript']);
  })
);
