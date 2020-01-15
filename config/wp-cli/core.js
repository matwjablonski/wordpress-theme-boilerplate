const shelljs = require('shelljs/shell');
const wpCli = require('./wp-cli');

const download = () => {
  console.log('ACTION: Download core');
  shelljs.exec(`${wpCli.baseCommand} core download --path=public`);
};

const config = (dbName, dbUser, dbPass, dbHost, dbPrefix) => {
  console.log('ACTION: Init wp-config file');
  shelljs
    .exec(`${wpCli.baseCommand} config create --skip-check --dbname=${dbName} --dbuser=${dbUser} --dbpass=${dbPass} --dbhost=${dbHost} --path=public`);
};

const db = (url, title, admin, mail) => {
  shelljs
    .exec(`${wpCli.baseCommand} core install --path=public --url=${url} --title=${title} --admin_user=${admin} --admin_email=${mail}`);
};

module.exports = {download, config, db};
