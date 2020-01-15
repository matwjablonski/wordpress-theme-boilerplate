const shelljs = require('shelljs/shell');
const wpCli = require('./wp-cli');

const requiredPlugins = [
  {plugin: 'timber-library', name: 'timber-library', activate: true},
  {plugin: 'http://woodpecker.pl/wordpress/plugins/wp-sync-db-1.5.zip', name: 'wp-sync-db', activate: true},
  {plugin: 'http://woodpecker.pl/wordpress/plugins/woocommerce.3.8.1.zip', name: 'woocommerce', activate: false},
  {plugin: 'http://woodpecker.pl/wordpress/plugins/advanced-custom-fields-pro.zip', name: 'advanced-custom-fields-pro', activate: true},
  {plugin: 'contact-form-7', name: 'contact-form-7', activate: true},
  {plugin: 'wordpress-importer', name: 'wordpress-importer', activate: true}
];

const install = () => {
  requiredPlugins.forEach(item => {
    shelljs
      .exec(`${wpCli.baseCommand} plugin is-installed ${item.name} --path=public | ${wpCli.baseCommand} plugin install ${item.plugin} --path=public ${item.activate ? '--activate' : ''}`);
  });
};

module.exports = {install};
