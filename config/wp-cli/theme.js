const shelljs = require('shelljs/shell');
const wpCli = require('./wp-cli');
const fs = require('fs');

const prepareStyleCSSContent = (settings) => {
  const {name, themeURI, description, author, authorURI, version, textDomain} = settings;
  const f = `/*\nTheme Name: ${name}-theme\nTheme URI: ${themeURI}\nDescription: ${description}\nAuthor: ${author}\nAuthor URI: ${authorURI}\nVersion: ${version}\nText Domain: ${textDomain}\n*/`;

  return f;
};

const init = (themeName = 'basic', theme) => {
  shelljs.exec(`mkdir -p public/wp-content/themes/${themeName}-theme`);
  shelljs.exec(`cp -R config/boilerplate/* public/wp-content/themes/${themeName}-theme`);
  fs.writeFile(`public/wp-content/themes/${themeName}-theme/style.css`, prepareStyleCSSContent(theme), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    shelljs.exec(`${wpCli.baseCommand} theme activate ${themeName}-theme --path=public`);
  });

};

module.exports = { init };
