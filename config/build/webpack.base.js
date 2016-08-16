const pathutil = require('path');
const webpack = require('webpack');

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }

module.exports = function createWebpackConfig() {
  return {
    target: 'web',
    debug: false,
    devtool: 'source-map',
    entry: {
      app: [
        './src/client',
      ],
    },
    output: {
      path: pathutil.join(__dirname, '..', '..', 'src/assets/js/'),
      publicPath: '/',
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
