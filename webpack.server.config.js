'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
  name: 'server',
  target: 'node',
  entry: { 
    server: './server/index.js', 
    'server.test': './server/server.test.js' 
  },
  output: {
    path: path.join(__dirname, './server/build/'),
    filename: '[name].bundle.js',
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // right now, production / development depends on the client
    })
  ]
};
