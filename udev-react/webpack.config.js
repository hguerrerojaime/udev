var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');
var SAMPLE_APP_DIR = path.resolve(__dirname, 'sample-app');

var NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

var PUBLIC_DIR = path.resolve(__dirname, 'public');

var env = argv.env ? argv.env : "development";

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.join(PUBLIC_DIR),
    compress: true,
    port: 9000
  }
};

var environments = {
  development: {
    entry: SAMPLE_APP_DIR + "/index.js",
    module : {
      loaders : [
        {
          test : /\.js?/,
          include : [APP_DIR, SAMPLE_APP_DIR],
          loader : 'babel-loader'
        }
      ]
    }
  }
};

var webpackConfig = Object.assign({},config,environments[env]);

module.exports = webpackConfig;
