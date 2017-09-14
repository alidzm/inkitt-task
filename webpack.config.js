var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/app.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(
      [{
          from: './src/fonts',
          to: path.join(__dirname, 'dist', 'fonts')
        },
        {
          from: './src/styles',
          to: path.join(__dirname, 'dist', 'styles')
        }
      ]
    )
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
}
