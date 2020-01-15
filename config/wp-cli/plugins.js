const shelljs = require('shelljs/shell');
const wpCli = require('./wp-cli');

const requiredPlugins = [
  'timber-library'
];

const install = () => {
  requiredPlugins.forEach(plugin => {
    shelljs.exec(`${wpCli.baseCommand} plugin install ${plugin} --path=public --activate`);
  });
};

module.exports = { install };
