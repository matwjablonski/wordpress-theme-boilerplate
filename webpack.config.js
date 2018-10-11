const settings = {};
const CopyWebpackPlugin = require('copy-webpack-plugin');

settings.theme = {
    slug: 'woodpecker-theme',
    name: 'Woodpecker Theme',
};

settings.paths = {
    src: './src',
    dist: `${__dirname}/public/wp-content/themes/${settings.theme.slug}`,
};

const plugins = [
    new CopyWebpackPlugin([
        {
            from: `${settings.paths.src}`,
            to: `${settings.paths.dist}/`,
            ignore: [ '*.js' ]
        }
    ])
]

module.exports = (env) => ({
    entry: `${settings.paths.src}/assets/js/app.js`,
    output: {
        path: `${settings.paths.dist}/assets/js`,
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins
    // rules: [
    //     {
    //         test: /\.(php|pot|po|mo)$/,
    //         use: [
    //             {
    //                 loader: 'file-loader',
    //                 options: {},
    //             }
    //         ]
    //     }
    // ]
});