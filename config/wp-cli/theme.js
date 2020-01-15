const shelljs = require('shelljs/shell');

const init = (themeName = 'basic') => {
  shelljs.exec(`mkdir -p public/wp-content/themes/${themeName}-theme`);
};

module.exports = { init };
