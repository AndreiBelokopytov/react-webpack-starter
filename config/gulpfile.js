'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const browserSync = require('browser-sync').create();
const swPrecache = require('sw-precache');
const env = require('./env');
const paths = require('./paths');

const webpackConfig = require(`./webpack.${env}.config.js`);

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

gulp.task('webpack:build', () => {
  return gulp.src(path.join(paths.SOURCE_FOLDER, 'index.js'))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.DIST_FOLDER));
});

gulp.task('webpack:watch', () => {
  return gulp.src(path.join(paths.SOURCE_FOLDER, 'index.js'))
    .pipe(webpack(Object.assign({}, webpackConfig, {
      watch: true
    })))
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

gulp.task('generate-service-worker', cb => {
  swPrecache.write(path.join(paths.DIST_FOLDER, 'service-worker.js'), {
    staticFileGlobs: [
      path.join(paths.DIST_FOLDER) + '/**/*.{js,json,html,css,png,jpg,gif,svg,eot,ttf,woff}'
    ],
    stripPrefix: paths.DIST_FOLDER
  }, cb);
});

gulp.task('build', gulp.series(
  'clean',
  'copy:public',
  'webpack:build',
  'generate-service-worker'
));
gulp.task('dev', gulp.series(
  'clean',
  'copy:public',
  'webpack:build',
  gulp.parallel('webpack:watch', 'server'
)));
