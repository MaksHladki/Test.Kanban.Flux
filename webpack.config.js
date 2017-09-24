const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATH = {
    app: path.join(__dirname, 'app'),
    template: path.join(__dirname, 'app', 'templates', 'index.html'),
    build: path.join(__dirname, 'build'),
    font: 'fonts/'
};

const common = {
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
                    loader: "url-loader",
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
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: PATH.font,
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATH.template
        })
    ]
}

// Default configuration
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATH.build,
            compress: false,
            port: 9000,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'normal',
            host: process.env.HOST,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
    });
}


if (TARGET === 'build') {
    module.exports = merge(common, {});
}