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
  DB_HOST,
  THEME_NAME,
  URL,
  TITLE,
  ADMIN_USER,
  ADMIN_EMAIL
} = process.env;

const typeOfProcess = process.argv.indexOf('--deploy') ? 'deploy' : 'development';

const settings = {};

settings.theme = {
  slug: THEME_NAME,
  name: THEME_NAME,
  themeURI: '',
  description: '',
  author: 'Mateusz Jabłoński',
  authorURI: 'mateuszjablonski.com',
  version: '0.0.1',
  textDomain: 'wood',
};

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
    if (typeOfProcess === 'development') {
      core.db(URL, TITLE, ADMIN_USER, ADMIN_EMAIL);
    }
  })
  .then(() => {
    if (typeOfProcess === "deploy") {
      plugins.install(false);
    }
    if (typeOfProcess === 'development') {
      plugins.install();
    }
  })
  .then(() => {
    if (typeOfProcess === "deploy") {
      theme.init(THEME_NAME, settings.theme, false);
    }
    if (typeOfProcess === 'development') {
      theme.init(THEME_NAME, settings.theme);
    }
  });
