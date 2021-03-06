const path = require('path');
const package = require('./package.json'); // loads npm config file for injecting in vendor
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              data: '@import "app/variables";',
              includePaths: [
                path.join(__dirname, 'src')
              ]
            }
          }
        ],
        include: path.join(__dirname, 'src')
      }
    ]
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
      }, {
        from: 'src/assets/',
        to: 'assets/'
      }
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'spotify-client-v1',
      filename: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 4194304,
      minify: true,
      runtimeCaching: [{
        handler: 'cacheFirst',
        urlPattern: /dist\/[**/*]$/,
      }],
      ignoreUrlParametersMatching: [/query$/]
    }),
    new ngAnnotatePlugin({
        add: true
    })
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