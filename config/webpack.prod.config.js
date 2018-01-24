const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.config.js')(true);
const paths = require('./paths');

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(paths.PUBLIC_FOLDER, 'index.html')
  }),
  new ExtractTextPlugin('style.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.UglifyJsPlugin()
];

module.exports = merge(common, {
  entry: {
    sw: path.join(paths.SOURCE_FOLDER, 'serviceWorkerRegistration.js')
  },
  plugins: plugins,
  devtool: 'source-map'
});
