const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const settings = {};

settings.paths = {
  src: './src',
  dist: `${__dirname}/public/wp-content/themes/${process.env.THEME_NAME}-theme/`,
};


const plugins = [

];

module.exports = (env) => ({
  entry: `${settings.paths.src}/assets/js/app.js`,
  output: {
    path: `${settings.paths.dist}/assets/js`,
    filename: `bundle.${env}.js`
  },
  mode: env || 'production',
  plugins
});
