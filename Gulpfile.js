const gulp = require('gulp'); // eslint-disable-line import/no-extraneous-dependencies
const mocha = require('gulp-mocha'); // eslint-disable-line import/no-extraneous-dependencies
const eslint = require('gulp-eslint'); // eslint-disable-line import/no-extraneous-dependencies

gulp.task('test', () => {
  const sources = [
    'test/**/*_test.js',
    'test/**/**/*_test.js',
  ];

  return gulp.src(sources, { read: false })
    .pipe(mocha({
      reporter: 'spec',
      require: ['should'],
    }));
});

gulp.task('lint', () => {
  const sources = [
    '**/*.js',
    '!node_modules/**',
    '!coverage/**',
  ];

  return gulp.src(sources)
    .pipe(eslint({
      configFile: 'test/.eslintrc',
    }))
    .pipe(eslint.format());
});

gulp.task('default', ['lint', 'test']);
