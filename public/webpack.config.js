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
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    debugger
                    // console.log('PROXY')
                    // if (req.headers.accept.indexOf('html') !== -1) {
                    //     console.log('Skipping proxy for browser request.');
                    //     return '/index.html';
                    // }
                },
            },
        },
    },
};

// webpack-dev-server --progress --colors