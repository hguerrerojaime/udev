var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');
var env = argv.env ? argv.env : "development";

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    libraryTarget: "umd"
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

  ]
};

var environments = {
  development: {}
};

var webpackConfig = Object.assign({},config,environments[env]);

module.exports = webpackConfig;
