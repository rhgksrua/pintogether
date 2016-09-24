var webpack = require('webpack');
var configIDE = require('./config/config')();

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon'],
    reporters: ['mocha'],
    port: configIDE.port,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    singleRun: false,
    browsers: configIDE.browsers,
    hostname: configIDE.hostname,
    concurrency: Infinity,
    files: [
      {pattern: 'client/**/*.test.js', watched: true},
      
    ],
    preprocessors: {
      'client/**/*.test.js': ['webpack'],
    },
    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      module: {
        loaders: [
          {
            test: /sinon\/pkg\/sinon/,
            loader: "imports?define=>false,require=>false"
          },
          {
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.s?css$/,
            loaders: ['style', 'css', 'sass']
          }
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
          if(/cheerio/.test(result.context)) {
            result.request = "./package.json";
          }
        })
      ]
    },
    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

  });
}
