'use strict';

const gulp = require('gulp');
const { paths } = require('../settings');

const copyThemeFiles = function() {
  return gulp
    .src(`${paths.theme}/**/*`)
    .pipe(
      gulp.dest(paths.public)
    );
};

module.exports = copyThemeFiles;
