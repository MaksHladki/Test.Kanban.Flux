 const webpack = require('webpack'),
     merge = require('webpack-merge'),
     UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
     common = require('./webpack.common.js');

 const PATH = common.path,
     config = common.config;

 module.exports = merge(config, {
     plugins: [
         new UglifyJSPlugin({
             include: PATH.app
         }),
         new webpack.DefinePlugin({
             'process.env': {
                 'NODE_ENV': JSON.stringify('production')
             }
         })
     ]
 });