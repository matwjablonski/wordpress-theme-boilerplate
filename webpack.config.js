const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


const settings = {};

settings.paths = {
  src: './src',
  dist: `${__dirname}/public/wp-content/themes/${process.env.THEME_NAME}-theme/dist`,
};

const plugins = [
  new CopyWebpackPlugin([
    {
      from: `${settings.paths.src}`,
      to: `${settings.paths.dist}/`,
      ignore: ['*.js', '*.ts']
    }
  ])
];

module.exports = (env) => ({
  entry: `${settings.paths.src}/assets/js/app.js`,
  output: {
    path: `${settings.paths.dist}/assets/js`,
    filename: `bundle.${env}.js`
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },
  plugins
});
