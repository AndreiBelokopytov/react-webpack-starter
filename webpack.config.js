const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const productionMode = process.env.NODE_ENV === 'production';
const devPlugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new ExtractTextPlugin('style.css')
];
const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.UglifyJsPlugin()
];

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                minimize: productionMode,
                sourceMap: !productionMode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !productionMode
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                minimize: productionMode,
                sourceMap: !productionMode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !productionMode
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !productionMode
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: Array.prototype.concat.apply(devPlugins, productionMode ? productionPlugins : []),
  devtool: productionMode ? '' : 'eval-source-map',
  watch: !productionMode
};

module.exports = config;
