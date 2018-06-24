'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig() {

    var config = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            {loader: 'css-loader', query: {sourceMap: true}}
                        ],
                    })
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [],
        externals: {
            angular: 'angular',
            lodash: '_'
        },
        devtool: '#source-map'
    };

    config.entry = {
        app: './src/index.js'
    };


    config.output = {
        path: __dirname + '/dist',
        filename: 'md-select-data.js',
        library: 'mdSelectData',
        libraryTarget: 'umd'
    };

    config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    config.plugins.push(
        new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true})
    );

    return config;
}();
