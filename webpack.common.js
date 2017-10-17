const path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    app: path.join(__dirname, 'app'),
    template: path.join(__dirname, 'app', 'templates', 'index.html'),
    favicon: path.join(__dirname, 'app', 'img', 'favicon.ico'),
    build: path.join(__dirname, 'build'),
    font: 'fonts/'
};

const config = {
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.build,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.jsx?$/,
                include: PATH.app,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]',
                        outputPath: PATH.font,
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: PATH.font
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([PATH.build]),
        new HtmlWebpackPlugin({
            template: PATH.template,
            favicon: PATH.favicon
        })
    ]
};


module.exports = {
    config,
    path: PATH
};