const webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js');

const PATH = common.path,
    config = common.config;

module.exports = merge(config, {
    module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            include: PATH.app,
            loader: 'eslint-loader',
            options: {}
          },
        ],
      },
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