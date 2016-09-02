require('babel-register')();

const pathutil = require('path');
const webpack = require('webpack');
const { default: config } = require('../');

const environment = config.environment;
const plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.DefinePlugin({
    'process.env.APP_CONFIG': JSON.stringify(config.root.client),
  }),
];

const appEntry = ['./src/client'];

// Special consideration for production environment
if (environment === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// Special consideration for development environment
if (environment === 'development') {
  plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
  context: config.cwd,
  target: 'web',
  debug: environment === 'test' || environment === 'development',
  devtool: environment === 'test' || environment === 'development' ? 'source-map' : undefined,
  entry: {
    app: appEntry,
  },
  output: {
    path: config.root.build.rootPath,
    filename: pathutil.join(config.root.build.path, '/js/[name].js'),
  },
  plugins,
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: pathutil.join(__dirname, '..', '..', 'src', 'client'),
      },
    ],
  },
};
