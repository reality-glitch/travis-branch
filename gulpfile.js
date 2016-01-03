'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const minifyHtml = require('gulp-minify-html');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });
});

gulp.task('supervisor', () => {
  watch('app/**/*', browserSync.reload);
});

gulp.task('usemin', () => {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [ rev ],
      js: [ uglify, rev ],
      html: [ function () { return minifyHtml({ empty: true }); } ]
    }))
    .pipe(gulp.dest('dist/'));
});
