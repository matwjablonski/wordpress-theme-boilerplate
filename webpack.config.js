const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const settings = {};

settings.theme = {
    slug: 'woodpecker-theme',
    name: 'Woodpecker Theme',
    themeURI: '',
    description: '',
    author: 'Mateusz Jabłoński',
    authorURI: 'mateuszjablonski.com',
    version: '0.0.1',
    textDomain: 'wood',
};

settings.paths = {
    src: './src',
    dist: `${__dirname}/public/wp-content/themes/${settings.theme.slug}`,
};

const prepareStyleCSSContent = (settings) => {
    const {name, themeURI, description, author, authorURI, version, textDomain} = settings;
    const f = `/*\nTheme Name: ${name}\nTheme URI: ${themeURI}\nDescription: ${description}\nAuthor: ${author}\nAuthor URI: ${authorURI}\nVersion: ${version}\nText Domain: ${textDomain}\n*/`;

    return f;
};

const plugins = [
    new CopyWebpackPlugin([
        {
            from: `${settings.paths.src}`,
            to: `${settings.paths.dist}/`,
            ignore: ['*.js', '*.ts']
        }
    ]),
    new CreateFileWebpack({
        path: `${settings.paths.dist}`,
        fileName: 'style.css',
        content: prepareStyleCSSContent(settings.theme),
    }),
    new ReplaceInFileWebpackPlugin([
        {
            dir: `${settings.paths.dist}/`,
            test: /\.php$/,
            rules: [
                {
                    search: '@@textDomain',
                    replace: settings.theme.textDomain
                },
                {
                    search: '@@version',
                    replace: settings.theme.version
                }
            ]
        }
    ]),
];

module.exports = (env) => ({
    entry: `${settings.paths.src}/assets/js/app.js`,
    output: {
        path: `${settings.paths.dist}/assets/js`,
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins
});