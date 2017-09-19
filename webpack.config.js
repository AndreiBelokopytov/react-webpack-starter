const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const productionMode = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: productionMode
    })
  ],
  devtool: productionMode ? '' : 'inline-source-map',
  watch: productionMode ? false : true
};

module.exports = config;
