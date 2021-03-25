const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
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
                test: /\.(js|ts)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};