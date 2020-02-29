const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'lib.umd.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'IDEAFastID'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
};