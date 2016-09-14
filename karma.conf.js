var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome'],
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
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext' : 'window',
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
