'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const browserSync = require('browser-sync').create();
const env = require('./env');
const paths = require('./paths');

const webpackConfig = `webpack.${env}.config.js`;

gulp.task('clean', () => {
  return del([
    path.join(paths.DIST_FOLDER, '/**/*'),
    path.join(paths.DIST_FOLDER, '!/.gitkeep')
  ], {
    force: true
  })
    .catch(err => console.error(err.message));
});

gulp.task('copy:public', () => {
  return gulp.src(path.join(__dirname, 'public/**/*'))
    .pipe(gulp.dest(paths.DIST_FOLDER));
});

gulp.task('webpack', () => {
  return gulp.src(path.join(paths.SOURCE_FOLDER, 'index.js'))
    .pipe(webpack(require(path.join(__dirname, webpackConfig))))
    .pipe(gulp.dest(paths.DIST_FOLDER));
});

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: paths.DIST_FOLDER
    }
  });

  return gulp.watch(path.join(paths.DIST_FOLDER, '**/*'))
    .on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'copy:public', 'webpack'));
gulp.task('dev', gulp.series('clean', 'copy:public', gulp.parallel('webpack', 'server')));
