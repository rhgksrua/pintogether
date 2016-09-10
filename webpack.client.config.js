'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  name: 'client',
  entry: './client/components/index.jsx',
  output: {
    path: './build/',
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
};

