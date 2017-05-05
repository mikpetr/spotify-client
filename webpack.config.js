const path = require('path');
const package = require('./package.json'); // loads npm config file for injecting in vendor
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/app.js',
    vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    modules: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: 'index.html'
      }
    ])
  ],
  devServer: {
    stats: { colors: true },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    historyApiFallback: true,
    hot: true,
    inline: true
  }
};