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

module.exports = {download, config};
