const dotenv = require('dotenv');
const core = require('./config/wp-cli/core');
const plugins = require('./config/wp-cli/plugins');
const theme = require('./config/wp-cli/theme');
const shelljs = require('shelljs/shell');

dotenv.config();

const {
    DB_USER,
    DB_NAME,
    DB_PWD,
    DB_HOST
} = process.env;

const init = () => new Promise((resolve, reject) => {
    resolve(
        shelljs.exec('curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar')
    );
});

init()
  .then(() => {
    shelljs.exec('mkdir -p wp-cli && mv wp-cli.phar ./wp-cli/wp-cli.phar');
  })
  .then(() => {
    core.download();
  })
  .then(() => {
    core.config(DB_NAME, DB_USER, DB_PWD, DB_HOST);
  })
  .then(() => {
    plugins.install();
  })
  .then(() => {
    theme.init();
  });
