const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

function getConfig (production = false) {
  return {
    entry: path.join(paths.SOURCE_FOLDER, 'index.js'),
    context: paths.APP_FOLDER,
    output: {
      path: paths.DIST_FOLDER,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: require.resolve('babel-loader')
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  minimize: production,
                  sourceMap: !production
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  sourceMap: !production
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    }
  };
}

module.exports = getConfig;
