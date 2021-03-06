var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devServer: {
        proxy: {
            '/api/search': {
                target: 'http://localhost:8081/',
                secure: false
            },
        },
    },
};

// webpack-dev-server --progress --colors