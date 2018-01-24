const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common.config.js')();

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(paths.PUBLIC_FOLDER, 'index.html')
  }),
  new ExtractTextPlugin('style.css')
];

module.exports = merge(common, {
  plugins: plugins,
  devtool: 'eval'
});
