const pathutil = require('path');
const webpack = require('webpack');

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }

module.exports = function createWebpackConfig() {
  return {
    context: pathutil.join(__dirname, '..', '..'),
    target: 'web',
    debug: false,
    devtool: 'source-map',
    entry: {
      app: [
        './src/client',
      ],
    },
    output: {
      path: './src/assets/js/',
      publicPath: '/js/',
      filename: '[name].js',
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: ['babel'],
        },
      ],
    },
  };
};
