const shelljs = require('shelljs/shell');
const wpCli = require('./wp-cli');
const unzip = require('unzip/unzip');
const fs = require('fs');

const requiredPlugins = [
  {
    url: 'http://woodpecker.pl/wordpress/plugins/timber-library.zip',
    name: 'timber-library',
    activate: true,
    library: 'wp'
  },
  {
    url: 'http://woodpecker.pl/wordpress/plugins/wp-sync-db.zip',
    name: 'wp-sync-db',
    activate: true,
    library: 'woodpecker'
  },
  {
    url: 'http://woodpecker.pl/wordpress/plugins/woocommerce.zip',
    name: 'woocommerce',
    activate: false,
    library: 'wp'
  },
  {
    url: 'http://woodpecker.pl/wordpress/plugins/advanced-custom-fields-pro.zip',
    name: 'advanced-custom-fields-pro',
    activate: true,
    library: 'woodpecker'
  },
  {
    url: 'http://woodpecker.pl/wordpress/plugins/contact-form-7.zip',
    name: 'contact-form-7',
    activate: true,
    library: 'wp'
  },
  {
    url: 'http://woodpecker.pl/wordpress/plugins/wordpress-importer.zip',
    name: 'wordpress-importer',
    activate: true,
    library: 'wp'
  }
];

const downloadPlugin = (url, name) => new Promise((resolve, reject) => {
  resolve(shelljs.exec(`cd zip && curl -O ${url}`));
});

const install = (activate = true) => {
  console.log('ACTION: Install plugins');
  shelljs.exec('mkdir -p zip');
  requiredPlugins.forEach(item => {
    console.log(`ACTION: Install ${item.name} plugin`);
    if (activate) {
      shelljs
        .exec(`${wpCli.baseCommand} plugin install ${item.library === 'wp' ? item.name : item.url} --path=public ${item.activate ? '--activate' : ''}`);
    }
    if (!activate) {
      downloadPlugin(item.url, item.name)
        .then(() => {
          fs
            .createReadStream(`zip/${item.name}.zip`)
            .pipe(
              unzip.Extract({ path: 'public/wp-content/plugins' })
            );
        });
    }
  });
};

module.exports = {install};
