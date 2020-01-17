'use strict';

const { watch } = require('gulp');
const { paths } = require('./config/gulp/settings');
const copyThemeFiles = require('./config/gulp/tasks/copyThemeFiles');

function defaultTask() {
  const watcher = watch([`${paths.theme}/**/*`]);

  watcher.on('change', () => {
    copyThemeFiles();
  });

  watcher.on('add', () => {
    copyThemeFiles();
  });
}

exports.default = defaultTask;
